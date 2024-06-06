DROP TABLE "order_items";--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "user_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE varchar(255);