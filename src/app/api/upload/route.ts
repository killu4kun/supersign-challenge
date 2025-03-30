import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { prisma } from '@/lib/prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error:
            'Você precisa estar autenticado para fazer upload de documentos',
        },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      );
    }

    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Apenas arquivos PDF são permitidos' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileKey = `${Date.now()}-${file.name}`;
    const uploadPath = path.join(process.cwd(), 'public/uploads', fileKey);

    await writeFile(uploadPath, buffer);

    const document = await prisma.document.create({
      data: {
        name: file.name,
        fileKey,
        userId: session.user.id,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer upload do documento' },
      { status: 500 }
    );
  }
}
