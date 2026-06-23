CREATE TABLE "follows" (
  "id" TEXT NOT NULL,
  "follower_id" TEXT NOT NULL,
  "followed_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "follows_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "follows_follower_id_followed_id_key"
  ON "follows"("follower_id", "followed_id");

CREATE INDEX "follows_follower_id_idx"
  ON "follows"("follower_id");

CREATE INDEX "follows_followed_id_idx"
  ON "follows"("followed_id");
