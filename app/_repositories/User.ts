import { prisma } from "../_utils/prismaSingleton";
import { Post, Category } from "@prisma/client";

export namespace UserRepository {
  export async function findMany() {
    return await prisma.user.findMany();
  }

  // export async function create(user: User) {
  //   return await prisma.user.create({
  //     //   data: user,
  //     data: {
  //       ...user,
  //     },
  //   });
  // }

  //create-a-single-record-and-multiple-related-records (User and Posts)
  export async function create(name: string, posts: Post[]) {
    return await prisma.user.create({
      data: {
        name,
        posts: {
          createMany: {
            data: [...posts],
          },
        },
      },
      include: {
        posts: true,
      },
    });
  }

  // export async function findUnique(id: string) {
  //   return await prisma.user.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  // export async function update(id: string, user: User) {
  //   return await prisma.user.update({
  //     where: {
  //       id: id,
  //     },
  //     data: {
  //       ...user,
  //     },
  //   });
  // }

  // export async function remove(id: string) {
  //   return await prisma.user.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }
}
