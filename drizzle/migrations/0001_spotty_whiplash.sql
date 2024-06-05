DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('processing', 'delivered');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "status" SET DATA TYPE status USING "status"::status;
