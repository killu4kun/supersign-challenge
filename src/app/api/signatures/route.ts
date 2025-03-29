import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { prisma } from '@/lib/prisma/client';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { documentId, signatureImg } = await req.json();

  try {
    // 1. Cria a assinatura
    const signature = await prisma.signature.create({
      data: {
        documentId,
        userId: session.user.id,
        signatureImg,
        signedAt: new Date(),
      },
    });

    // 2. Atualiza o status do documento
    await prisma.document.update({
      where: { id: documentId },
      data: { status: 'SIGNED' },
    });

    return NextResponse.json(signature);
  } catch (error) {
    console.error('Error saving signature:', error);
    return NextResponse.json(
      { error: 'Failed to save signature' },
      { status: 500 }
    );
  }
}
