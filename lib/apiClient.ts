"use server";

import prisma from "./prisma";

async function deleteAirdrop(id: string): Promise<void> {
  try {
    await prisma.airdrop.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Error deleting airdrop: ${error}`);
  }
}

export { deleteAirdrop };
