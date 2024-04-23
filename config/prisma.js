const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
	if (process.env.NODE_ENV === "production") {
		console.log("Running in production mode");
		return;
	}
	const user = await prisma.user.upsert({
		where: { email: "icanq@mail.com" },
		update: {},
		create: {
			name: "icanq",
			email: "icanq@mail.com",
		},
	});

	console.log({ user });
}

run()
	.catch((e) => {
		console.log(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

module.exports = { prisma };
