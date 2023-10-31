import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Category, Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { User } from "@prisma/client";
import { UserRepository } from "@/app/_repositories/User";

export async function GET(request: NextRequest) {
  try {
    const users = await UserRepository.findMany();
    return NextResponse.json(users);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const user: User = await request.json();
//     const createdUser = await UserRepository.create(user);

//     console.log(createdUser);
//     return NextResponse.json(createdUser);
//   } catch (e) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

//## createMany
// export async function POST(request: NextRequest) {
//   interface CreateData {
//     name: string;
//     posts: Post[];
//   }
//   try {
//     const data: CreateData = await request.json();

//     const name = data.name;
//     const posts: Post[] = data.posts;

//     // console.log(name, posts);
//     // const createdUser = await UserRepository.createMany(name, posts);

//     return NextResponse.json(name);
//   } catch (e) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const user: User = await request.json();
//     const createdUser = await UserRepository.create(user);

//     console.log(createdUser);
//     return NextResponse.json(createdUser);
//   } catch (e) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

//create-a-single-record-and-multiple-related-records (User and Posts)
export async function POST(request: NextRequest) {
  try {
    interface CreateData {
      name: string;
      posts: Post[];
    }

    const data: CreateData = await request.json();
    const name = data.name;
    const posts: Post[] = data.posts;
    const createdUser = await UserRepository.create(name, posts);
    return NextResponse.json(createdUser);
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
