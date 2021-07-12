import { getDb } from "../db.js";


export async function getCampuses() {
  const db = await getDb();
  return db.all("SELECT * from campus");
}

export async function queryCampuses(limit, offset) {
  const db = await getDb();
  return db.all("SELECT * from campus LIMIT ?,?", limit, offset);
}

export async function postCampus(name) {
  const db = await getDb();
  return db.run("INSERT INTO campus (name) VALUES (?)", name);
}

export async function patchCampus(id, name) {
  const db = await getDb();
  return db.run("UPDATE campus SET name = ? WHERE id = ?", name, id);
}

export async function putCampus(id, name) {
  const db = await getDb();
  return db.run("UPDATE campus SET name = ? WHERE id = ?", name, id);
}

export async function delCampus(id) {
  const db = await getDb();
  return db.run("DELETE FROM campus WHERE id = ?", id);
}