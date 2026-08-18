-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('PERSONAL', 'PROFESSIONAL', 'OPEN_SOURCE');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('LIVE', 'IN_PROGRESS', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('BACKEND', 'FRONTEND', 'DATABASE', 'DEVOPS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectType" "ProjectType" NOT NULL DEFAULT 'PERSONAL',
    "status" "ProjectStatus" NOT NULL DEFAULT 'LIVE',
    "domainName" TEXT,
    "githubUrl" TEXT,
    "isGithubPublic" BOOLEAN NOT NULL DEFAULT true,
    "technologies" TEXT[],
    "highlights" TEXT[],
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "SkillCategory" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
