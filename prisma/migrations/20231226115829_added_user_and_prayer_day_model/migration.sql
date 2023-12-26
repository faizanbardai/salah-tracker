-- CreateEnum
CREATE TYPE "PrayerStatus" AS ENUM ('NOT_PRAYED', 'PRAYED_QADA', 'PRAYED_ON_TIME', 'PRAYED_WITH_JAMAAT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrayerDay" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "fajr" "PrayerStatus" NOT NULL DEFAULT 'NOT_PRAYED',
    "dhuhr" "PrayerStatus" NOT NULL DEFAULT 'NOT_PRAYED',
    "asr" "PrayerStatus" NOT NULL DEFAULT 'NOT_PRAYED',
    "maghrib" "PrayerStatus" NOT NULL DEFAULT 'NOT_PRAYED',
    "isha" "PrayerStatus" NOT NULL DEFAULT 'NOT_PRAYED',
    "tahajjud" "PrayerStatus" NOT NULL DEFAULT 'NOT_PRAYED',

    CONSTRAINT "PrayerDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PrayerDay" ADD CONSTRAINT "PrayerDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
