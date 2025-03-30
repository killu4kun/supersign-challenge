import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { prisma } from '@/lib/prisma/client';
import { unlink } from 'fs/promises';
import path from 'path';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params;

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params;

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Você precisa estar autenticado para excluir documentos' },
        { status: 401 }
      );
    }

    const document = await prisma.document.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        signatures: true,
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Documento não encontrado' },
        { status: 404 }
      );
    }

    // Remove o arquivo físico
    const filePath = path.join(
      process.cwd(),
      'public/uploads',
      document.fileKey
    );
    try {
      await unlink(filePath);
    } catch (error) {
      console.error('Erro ao excluir arquivo físico:', error);
    }

    // Remove as assinaturas e o documento do banco de dados
    await prisma.$transaction([
      // Primeiro remove todas as assinaturas
      prisma.signature.deleteMany({
        where: { documentId: id },
      }),
      // Depois remove o documento
      prisma.document.delete({
        where: { id },
      }),
    ]);

    return NextResponse.json({ message: 'Documento excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir documento' },
      { status: 500 }
    );
  }
}
