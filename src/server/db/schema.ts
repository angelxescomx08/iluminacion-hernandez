import { relations } from "drizzle-orm";
import { index, pgTableCreator, primaryKey, timestamp } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

const commonColumns = {
	createdAt: timestamp({ mode: "date", withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp({ mode: "date", withTimezone: true }).notNull().defaultNow(),
}

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
	(name) => name,
);

export const users = createTable("user", (d) => ({
	id: d
		.varchar({ length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: d.varchar({ length: 255 }),
	email: d.varchar({ length: 255 }).notNull(),
	emailVerified: d
		.timestamp({
			mode: "date",
			withTimezone: true,
		})
		.$defaultFn(() => /* @__PURE__ */ new Date()),
	image: d.varchar({ length: 255 }),
}));

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
}));

export const accounts = createTable(
	"account",
	(d) => ({
		userId: d
			.varchar({ length: 255 })
			.notNull()
			.references(() => users.id),
		type: d.varchar({ length: 255 }).$type<AdapterAccount["type"]>().notNull(),
		provider: d.varchar({ length: 255 }).notNull(),
		providerAccountId: d.varchar({ length: 255 }).notNull(),
		refresh_token: d.text(),
		access_token: d.text(),
		expires_at: d.integer(),
		token_type: d.varchar({ length: 255 }),
		scope: d.varchar({ length: 255 }),
		id_token: d.text(),
		session_state: d.varchar({ length: 255 }),
	}),
	(t) => [
		primaryKey({ columns: [t.provider, t.providerAccountId] }),
		index("account_user_id_idx").on(t.userId),
	],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
	"session",
	(d) => ({
		sessionToken: d.varchar({ length: 255 }).notNull().primaryKey(),
		userId: d
			.varchar({ length: 255 })
			.notNull()
			.references(() => users.id),
		expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
	}),
	(t) => [index("t_user_id_idx").on(t.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
	"verification_token",
	(d) => ({
		identifier: d.varchar({ length: 255 }).notNull(),
		token: d.varchar({ length: 255 }).notNull(),
		expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
	}),
	(t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

export const products = createTable("product", (d) => ({
	id: d.varchar({ length: 255 }).notNull().primaryKey(),
	name: d.varchar({ length: 255 }).notNull(),
	price: d.real().notNull(),
	slug: d.varchar({ length: 255 }).notNull(),
	description: d.text(),
	content: d.text(),
	...commonColumns,
}))

export const brands = createTable("brand", (d) => ({
	id: d.varchar({ length: 255 }).notNull().primaryKey(),
	name: d.varchar({ length: 255 }).notNull(),
	catalog: d.varchar({ length: 255 }),
	content: d.text(),
	description: d.text(),
	...commonColumns,
}))

export const categories = createTable("category", (d) => ({
	id: d.varchar({ length: 255 }).notNull().primaryKey(),
	name: d.varchar({ length: 255 }).notNull(),
	...commonColumns,
}))

export const productsCategories = createTable("products_categories", (d) => ({
	productId: d.varchar({ length: 255 }).notNull().references(() => products.id),
	categoryId: d.varchar({ length: 255 }).notNull().references(() => categories.id),
	...commonColumns,
}), (t) => [primaryKey({ columns: [t.productId, t.categoryId] })])

export const productsBrands = createTable("products_brands", (d) => ({
	productId: d.varchar({ length: 255 }).notNull().references(() => products.id),
	brandId: d.varchar({ length: 255 }).notNull().references(() => brands.id),
	...commonColumns,
}), (t) => [primaryKey({ columns: [t.productId, t.brandId] })])

export const discounts = createTable("discount", (d) => ({
	id: d.varchar({ length: 255 }).notNull().primaryKey(),
	stripeCouponId: d.varchar({ length: 255 }),
	stripePromoCodeId: d.varchar({ length: 255 }),
	name: d.varchar({ length: 255 }).notNull(),
	type: d.varchar({ length: 255 }).$type<"percentage" | "fixed">().notNull(),
	value: d.real().notNull(),
	startsAt: d.timestamp({ mode: "date", withTimezone: true }),
	endsAt: d.timestamp({ mode: "date", withTimezone: true }),
	active: d.boolean().notNull().default(true),
	...commonColumns,
}))

export const discountsProducts = createTable("discounts_products", (d) => ({
	discountId: d.varchar({ length: 255 }).notNull().references(() => discounts.id),
	productId: d.varchar({ length: 255 }).notNull().references(() => products.id),
	...commonColumns,
}), (t) => [primaryKey({ columns: [t.discountId, t.productId] })])

export const discountsCategories = createTable("discounts_categories", (d) => ({
	discountId: d.varchar({ length: 255 }).notNull().references(() => discounts.id),
	categoryId: d.varchar({ length: 255 }).notNull().references(() => categories.id),
	...commonColumns,
}), (t) => [primaryKey({ columns: [t.discountId, t.categoryId] })])

export const discountsBrands = createTable("discounts_brands", (d) => ({
	discountId: d.varchar({ length: 255 }).notNull().references(() => discounts.id),
	brandId: d.varchar({ length: 255 }).notNull().references(() => brands.id),
	...commonColumns,
}), (t) => [primaryKey({ columns: [t.discountId, t.brandId] })])

export const orders = createTable("order", (d) => ({
	id: d.varchar({ length: 255 }).notNull().primaryKey(),
	userId: d.varchar({ length: 255 }).notNull().references(() => users.id),
	stripeSessionId: d.varchar({ length: 255 }),
	stripePaymentIntentId: d.varchar({ length: 255 }),
	paymentMethodType: d.varchar({ length: 255 }),
	paymentMethodBrand: d.varchar({ length: 255 }),
	paymentLast4: d.varchar({ length: 4 }),
	status: d.varchar({ length: 255 }).$type<"pending" | "paid" | "failed" | "refunded" | "cancelled">().notNull(),
	subTotal: d.real().notNull(),
	discountTotal: d.real().notNull(),
	total: d.real().notNull(),
	currency: d.varchar({ length: 3 }).notNull(),
	...commonColumns,
}))

export const ordersItems = createTable("orders_items", (d) => ({
	id: d.varchar({ length: 255 }).notNull().primaryKey(),
	orderId: d.varchar({ length: 255 }).notNull().references(() => orders.id),
	productId: d.varchar({ length: 255 }).notNull().references(() => products.id),
	quantity: d.integer().notNull(),
	unitPrice: d.real().notNull(),
	totalPrice: d.real().notNull(),
	...commonColumns,
}))

export const orderDiscounts = createTable("order_discounts", (d) => ({
	orderId: d.varchar({ length: 255 }).notNull().references(() => orders.id),
	discountId: d.varchar({ length: 255 }).notNull().references(() => discounts.id),
	amount: d.real().notNull(),
	...commonColumns,
}), (t) => [primaryKey({ columns: [t.orderId, t.discountId] })])