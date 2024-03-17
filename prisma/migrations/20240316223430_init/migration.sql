BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[PrayerDay] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [date] DATETIME2 NOT NULL,
    [fajr] INT NOT NULL CONSTRAINT [PrayerDay_fajr_df] DEFAULT 0,
    [dhuhr] INT NOT NULL CONSTRAINT [PrayerDay_dhuhr_df] DEFAULT 0,
    [asr] INT NOT NULL CONSTRAINT [PrayerDay_asr_df] DEFAULT 0,
    [maghrib] INT NOT NULL CONSTRAINT [PrayerDay_maghrib_df] DEFAULT 0,
    [isha] INT NOT NULL CONSTRAINT [PrayerDay_isha_df] DEFAULT 0,
    [tahajjud] BIT NOT NULL CONSTRAINT [PrayerDay_tahajjud_df] DEFAULT 0,
    [fast] BIT NOT NULL CONSTRAINT [PrayerDay_fast_df] DEFAULT 0,
    CONSTRAINT [PrayerDay_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PrayerDay_date_userId_key] UNIQUE NONCLUSTERED ([date],[userId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [PrayerDay_userId_idx] ON [dbo].[PrayerDay]([userId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
