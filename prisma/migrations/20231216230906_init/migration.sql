-- CreateTable
CREATE TABLE "Users" (
    "id" BIGSERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_infos" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "about" TEXT,
    "avatar" TEXT,

    CONSTRAINT "User_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_socials" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "soc_name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "User_socials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_login_key" ON "Users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_infos_userId_key" ON "User_infos"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_socials_userId_key" ON "User_socials"("userId");

-- AddForeignKey
ALTER TABLE "User_infos" ADD CONSTRAINT "User_infos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_socials" ADD CONSTRAINT "User_socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
