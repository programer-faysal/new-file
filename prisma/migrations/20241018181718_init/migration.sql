-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'MODERATOR');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'SCHEDULE', 'PUBLISH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "after" INTEGER NOT NULL DEFAULT 1,
    "active" BOOLEAN NOT NULL,
    "description" TEXT,
    "comment" TEXT,
    "cStatus" BOOLEAN NOT NULL,
    "lPublish" TIMESTAMP(3),
    "nPublish" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reel" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT,
    "comment" TEXT,
    "publish" TIMESTAMP(3),
    "status" "Status" NOT NULL,
    "pageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_id_idx" ON "User"("email", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Page_id_key" ON "Page"("id");

-- CreateIndex
CREATE INDEX "Page_active_lPublish_nPublish_id_idx" ON "Page"("active", "lPublish", "nPublish", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Reel_id_key" ON "Reel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reel_link_key" ON "Reel"("link");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reel" ADD CONSTRAINT "Reel_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reel" ADD CONSTRAINT "Reel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
