
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_NAME = "Admin";
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "Admin@123456";

async function createAdmin() {
    try {
        const email = ADMIN_EMAIL.trim().toLowerCase();

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            await prisma.user.update({
                where: { email },
                data: {
                    role: "ADMIN",
                },
            });

            console.log("Existing user promoted to ADMIN.");
            console.log("Email:", email);
            return;
        }

        const hashedPassword = await bcrypt.hash(
            ADMIN_PASSWORD,
            12
        );

        const admin = await prisma.user.create({
            data: {
                name: ADMIN_NAME,
                email,
                password: hashedPassword,
                role: "ADMIN",
            },
        });

        console.log("Admin created successfully!");
        console.log("ID:", admin.id);
        console.log("Email:", admin.email);
        console.log("Role:", admin.role);

    } catch (error) {
        console.error("Admin creation failed:", error);
        process.exitCode = 1;
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
