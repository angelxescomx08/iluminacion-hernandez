CREATE TABLE "account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "brand" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"catalog" varchar(255),
	"content" text,
	"description" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "discount" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"stripeCouponId" varchar(255),
	"stripePromoCodeId" varchar(255),
	"name" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"value" real NOT NULL,
	"startsAt" timestamp with time zone,
	"endsAt" timestamp with time zone,
	"active" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "discounts_brands" (
	"discountId" varchar(255) NOT NULL,
	"brandId" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "discounts_brands_discountId_brandId_pk" PRIMARY KEY("discountId","brandId")
);
--> statement-breakpoint
CREATE TABLE "discounts_categories" (
	"discountId" varchar(255) NOT NULL,
	"categoryId" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "discounts_categories_discountId_categoryId_pk" PRIMARY KEY("discountId","categoryId")
);
--> statement-breakpoint
CREATE TABLE "discounts_products" (
	"discountId" varchar(255) NOT NULL,
	"productId" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "discounts_products_discountId_productId_pk" PRIMARY KEY("discountId","productId")
);
--> statement-breakpoint
CREATE TABLE "order_discounts" (
	"orderId" varchar(255) NOT NULL,
	"discountId" varchar(255) NOT NULL,
	"amount" real NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "order_discounts_orderId_discountId_pk" PRIMARY KEY("orderId","discountId")
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"stripeSessionId" varchar(255),
	"stripePaymentIntentId" varchar(255),
	"paymentMethodType" varchar(255),
	"paymentMethodBrand" varchar(255),
	"paymentLast4" varchar(4),
	"status" varchar(255) NOT NULL,
	"subTotal" real NOT NULL,
	"discountTotal" real NOT NULL,
	"total" real NOT NULL,
	"currency" varchar(3) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders_items" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"orderId" varchar(255) NOT NULL,
	"productId" varchar(255) NOT NULL,
	"quantity" integer NOT NULL,
	"unitPrice" real NOT NULL,
	"totalPrice" real NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" real NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"content" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products_brands" (
	"productId" varchar(255) NOT NULL,
	"brandId" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_brands_productId_brandId_pk" PRIMARY KEY("productId","brandId")
);
--> statement-breakpoint
CREATE TABLE "products_categories" (
	"productId" varchar(255) NOT NULL,
	"categoryId" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_categories_productId_categoryId_pk" PRIMARY KEY("productId","categoryId")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp with time zone,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discounts_brands" ADD CONSTRAINT "discounts_brands_discountId_discount_id_fk" FOREIGN KEY ("discountId") REFERENCES "public"."discount"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discounts_brands" ADD CONSTRAINT "discounts_brands_brandId_brand_id_fk" FOREIGN KEY ("brandId") REFERENCES "public"."brand"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discounts_categories" ADD CONSTRAINT "discounts_categories_discountId_discount_id_fk" FOREIGN KEY ("discountId") REFERENCES "public"."discount"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discounts_categories" ADD CONSTRAINT "discounts_categories_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discounts_products" ADD CONSTRAINT "discounts_products_discountId_discount_id_fk" FOREIGN KEY ("discountId") REFERENCES "public"."discount"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discounts_products" ADD CONSTRAINT "discounts_products_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_discounts" ADD CONSTRAINT "order_discounts_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_discounts" ADD CONSTRAINT "order_discounts_discountId_discount_id_fk" FOREIGN KEY ("discountId") REFERENCES "public"."discount"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_brands" ADD CONSTRAINT "products_brands_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_brands" ADD CONSTRAINT "products_brands_brandId_brand_id_fk" FOREIGN KEY ("brandId") REFERENCES "public"."brand"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "t_user_id_idx" ON "session" USING btree ("userId");