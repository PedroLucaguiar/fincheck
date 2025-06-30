/*
  Warnings:

  - You are about to drop the `banl_accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "banl_accounts";

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "initial_balance" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);
