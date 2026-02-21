-- CreateTable
CREATE TABLE "Url" (
    "urlShort" TEXT NOT NULL,
    "urlLong" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("urlShort")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_urlLong_key" ON "Url"("urlLong");
