-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('User', 'Admin');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerification" BOOLEAN NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Roles" NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "refreshToken" TEXT,
    "emailVerificationCode" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "authorEmail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "tags" TEXT[],
    "createdDate" TIMESTAMP(3) NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_email_key" ON "User"("id", "email");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_authorEmail_fkey" FOREIGN KEY ("userId", "authorEmail") REFERENCES "User"("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;
