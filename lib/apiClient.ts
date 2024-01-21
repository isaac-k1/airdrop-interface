"use server";

import prisma from "./prisma";

export async function deleteAirdrop(id: string): Promise<void> {
  try {
    await prisma.airdrop.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Error deleting airdrop: ${error}`);
  }
}

export async function modifyAirdrop(
  id: string,
  chain: string,
  protocol: string,
  confirmed: boolean,
  expectedTgeDate: string
): Promise<void> {
  try {
    await prisma.airdrop.update({
      where: { id },
      data: {
        chain,
        protocol,
        confirmed,
        expectedTgeDate: new Date(expectedTgeDate),
      },
    });
  } catch (error) {
    throw new Error(`Error modifying airdrop: ${error}`);
  }
}

export async function getAllAirdrops(): Promise<any> {
  try {
    const airdrops = await prisma.airdrop.findMany();
    return airdrops;
  } catch (error) {
    throw new Error(`Error getting all airdrops: ${error}`);
  }
}
