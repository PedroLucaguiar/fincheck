/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('CHECKING', 'INVESTIMENT', 'CASH');

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "banl_accounts" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "initial_balance" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "banl_accounts_pkey" PRIMARY KEY ("id")
);
