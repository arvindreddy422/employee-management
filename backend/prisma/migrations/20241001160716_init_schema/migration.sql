-- CreateTable
CREATE TABLE "t_login" (
    "f_id" SERIAL NOT NULL,
    "f_userName" TEXT NOT NULL,
    "f_Pwd" TEXT NOT NULL,

    CONSTRAINT "t_login_pkey" PRIMARY KEY ("f_id")
);

-- CreateTable
CREATE TABLE "t_Employee" (
    "f_Id" SERIAL NOT NULL,
    "f_Image" TEXT NOT NULL,
    "f_Name" TEXT NOT NULL,
    "f_Email" TEXT NOT NULL,
    "f_Mobile" INTEGER NOT NULL,
    "f_Designation" TEXT NOT NULL,
    "f_gender" TEXT NOT NULL,
    "f_Course" TEXT NOT NULL,
    "f_Createdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_Employee_pkey" PRIMARY KEY ("f_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "t_login_f_userName_key" ON "t_login"("f_userName");
