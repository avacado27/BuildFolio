import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib /mongodb";

const DB_NAME = "buildfolio";
const COLLECTION = "projects";

async function getCollection() {
  const client = await clientPromise;
  return client.db(DB_NAME).collection(COLLECTION);
}

export async function GET() {
  try {
    const col = await getCollection();
    const projects = await col.find({}).sort({ updatedAt: -1 }).toArray();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const now = new Date().toISOString();
    const project = {
      title: body.title,
      description: body.description ?? "",
      tags: body.tags ?? [],
      tasks: body.tasks ?? [],
      createdAt: now,
      updatedAt: now,
    };
    const col = await getCollection();
    const result = await col.insertOne(project);
    return NextResponse.json({ ...project, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
