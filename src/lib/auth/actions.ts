'use server';
import { prisma } from '@/lib/prisma/client';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/schemas/auth-schema';

export async function registerUser(data: unknown) {
  const validated = registerSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }

  const { name, email, password } = validated.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: { email: ['E-mail já cadastrado'] } };

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: { _form: ['Erro ao criar usuário'] } };
  }
}
