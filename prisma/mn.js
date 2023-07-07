const { PrismaClient } = require('@prisma/client');
const internal = require('stream');
const prisma = new PrismaClient();

async function Item_Category() {
    const createMany = await prisma.item_category.createMany({
        data: [
            {
                cat_id:1,
                item_id:1,
            },
            {
                cat_id:2,
                item_id:1,
            },
            {
                cat_id:3,
                item_id:2,
            },
            {
                cat_id:4,
                item_id:2,
            },
            {
                cat_id:3,
                item_id:3,
            },
            {
                cat_id:4,
                item_id:3,
            },
            {
                cat_id:2,
                item_id:4,
            },
            {
                cat_id:5,
                item_id:4,
            },
            {
                cat_id:2,
                item_id:5,
            },
            {
                cat_id:3,
                item_id:5,
            },
        ],
        skipDuplicates: true
    }
    );
}

Item_Category()

.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
})