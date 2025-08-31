CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"committee" text NOT NULL,
	"hours" text,
	"description" text NOT NULL,
	"url" text,
	"featured" boolean DEFAULT false,
	"address" text NOT NULL,
	"age" text NOT NULL,
	"image_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
