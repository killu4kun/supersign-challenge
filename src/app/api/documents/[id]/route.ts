import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { prisma } from '@/lib/prisma/client';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await context.params;

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Você precisa estar autenticado para visualizar documentos' },
        { status: 401 }
      );
    }

    const document = await prisma.document.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        signatures: {
          orderBy: {
            signedAt: 'desc',
          },
        },
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Documento não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error('Erro ao buscar documento:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar documento' },
      { status: 500 }
    );
  }
}
