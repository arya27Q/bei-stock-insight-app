
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Stock
 * 
 */
export type Stock = $Result.DefaultSelection<Prisma.$StockPayload>
/**
 * Model AiInsight
 * 
 */
export type AiInsight = $Result.DefaultSelection<Prisma.$AiInsightPayload>
/**
 * Model AiChatLog
 * 
 */
export type AiChatLog = $Result.DefaultSelection<Prisma.$AiChatLogPayload>
/**
 * Model LotSimulation
 * 
 */
export type LotSimulation = $Result.DefaultSelection<Prisma.$LotSimulationPayload>
/**
 * Model Watchlist
 * 
 */
export type Watchlist = $Result.DefaultSelection<Prisma.$WatchlistPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Stocks
 * const stocks = await prisma.stock.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Stocks
   * const stocks = await prisma.stock.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.stock`: Exposes CRUD operations for the **Stock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stocks
    * const stocks = await prisma.stock.findMany()
    * ```
    */
  get stock(): Prisma.StockDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiInsight`: Exposes CRUD operations for the **AiInsight** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiInsights
    * const aiInsights = await prisma.aiInsight.findMany()
    * ```
    */
  get aiInsight(): Prisma.AiInsightDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiChatLog`: Exposes CRUD operations for the **AiChatLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiChatLogs
    * const aiChatLogs = await prisma.aiChatLog.findMany()
    * ```
    */
  get aiChatLog(): Prisma.AiChatLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lotSimulation`: Exposes CRUD operations for the **LotSimulation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LotSimulations
    * const lotSimulations = await prisma.lotSimulation.findMany()
    * ```
    */
  get lotSimulation(): Prisma.LotSimulationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.watchlist`: Exposes CRUD operations for the **Watchlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Watchlists
    * const watchlists = await prisma.watchlist.findMany()
    * ```
    */
  get watchlist(): Prisma.WatchlistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Stock: 'Stock',
    AiInsight: 'AiInsight',
    AiChatLog: 'AiChatLog',
    LotSimulation: 'LotSimulation',
    Watchlist: 'Watchlist',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "stock" | "aiInsight" | "aiChatLog" | "lotSimulation" | "watchlist" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Stock: {
        payload: Prisma.$StockPayload<ExtArgs>
        fields: Prisma.StockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findFirst: {
            args: Prisma.StockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findMany: {
            args: Prisma.StockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          create: {
            args: Prisma.StockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          createMany: {
            args: Prisma.StockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          update: {
            args: Prisma.StockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          deleteMany: {
            args: Prisma.StockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          aggregate: {
            args: Prisma.StockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStock>
          }
          groupBy: {
            args: Prisma.StockGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockCountArgs<ExtArgs>
            result: $Utils.Optional<StockCountAggregateOutputType> | number
          }
        }
      }
      AiInsight: {
        payload: Prisma.$AiInsightPayload<ExtArgs>
        fields: Prisma.AiInsightFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiInsightFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInsightPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiInsightFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInsightPayload>
          }
          findFirst: {
            args: Prisma.AiInsightFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInsightPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiInsightFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInsightPayload>
          }
          findMany: {
            args: Prisma.AiInsightFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInsightPayload>[]
          }
          create: {
            args: Prisma.AiInsightCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInsightPayload>
          }
          createMany: {
            args: Prisma.AiInsightCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AiInsightDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInsightPayload>
          }
          update: {
            args: Prisma.AiInsightUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInsightPayload>
          }
          deleteMany: {
            args: Prisma.AiInsightDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiInsightUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AiInsightUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiInsightPayload>
          }
          aggregate: {
            args: Prisma.AiInsightAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiInsight>
          }
          groupBy: {
            args: Prisma.AiInsightGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiInsightGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiInsightCountArgs<ExtArgs>
            result: $Utils.Optional<AiInsightCountAggregateOutputType> | number
          }
        }
      }
      AiChatLog: {
        payload: Prisma.$AiChatLogPayload<ExtArgs>
        fields: Prisma.AiChatLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiChatLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiChatLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatLogPayload>
          }
          findFirst: {
            args: Prisma.AiChatLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiChatLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatLogPayload>
          }
          findMany: {
            args: Prisma.AiChatLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatLogPayload>[]
          }
          create: {
            args: Prisma.AiChatLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatLogPayload>
          }
          createMany: {
            args: Prisma.AiChatLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AiChatLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatLogPayload>
          }
          update: {
            args: Prisma.AiChatLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatLogPayload>
          }
          deleteMany: {
            args: Prisma.AiChatLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiChatLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AiChatLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatLogPayload>
          }
          aggregate: {
            args: Prisma.AiChatLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiChatLog>
          }
          groupBy: {
            args: Prisma.AiChatLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiChatLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiChatLogCountArgs<ExtArgs>
            result: $Utils.Optional<AiChatLogCountAggregateOutputType> | number
          }
        }
      }
      LotSimulation: {
        payload: Prisma.$LotSimulationPayload<ExtArgs>
        fields: Prisma.LotSimulationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LotSimulationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotSimulationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LotSimulationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotSimulationPayload>
          }
          findFirst: {
            args: Prisma.LotSimulationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotSimulationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LotSimulationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotSimulationPayload>
          }
          findMany: {
            args: Prisma.LotSimulationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotSimulationPayload>[]
          }
          create: {
            args: Prisma.LotSimulationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotSimulationPayload>
          }
          createMany: {
            args: Prisma.LotSimulationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LotSimulationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotSimulationPayload>
          }
          update: {
            args: Prisma.LotSimulationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotSimulationPayload>
          }
          deleteMany: {
            args: Prisma.LotSimulationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LotSimulationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LotSimulationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotSimulationPayload>
          }
          aggregate: {
            args: Prisma.LotSimulationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLotSimulation>
          }
          groupBy: {
            args: Prisma.LotSimulationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LotSimulationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LotSimulationCountArgs<ExtArgs>
            result: $Utils.Optional<LotSimulationCountAggregateOutputType> | number
          }
        }
      }
      Watchlist: {
        payload: Prisma.$WatchlistPayload<ExtArgs>
        fields: Prisma.WatchlistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WatchlistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WatchlistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          findFirst: {
            args: Prisma.WatchlistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WatchlistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          findMany: {
            args: Prisma.WatchlistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>[]
          }
          create: {
            args: Prisma.WatchlistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          createMany: {
            args: Prisma.WatchlistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WatchlistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          update: {
            args: Prisma.WatchlistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          deleteMany: {
            args: Prisma.WatchlistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WatchlistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WatchlistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          aggregate: {
            args: Prisma.WatchlistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWatchlist>
          }
          groupBy: {
            args: Prisma.WatchlistGroupByArgs<ExtArgs>
            result: $Utils.Optional<WatchlistGroupByOutputType>[]
          }
          count: {
            args: Prisma.WatchlistCountArgs<ExtArgs>
            result: $Utils.Optional<WatchlistCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    stock?: StockOmit
    aiInsight?: AiInsightOmit
    aiChatLog?: AiChatLogOmit
    lotSimulation?: LotSimulationOmit
    watchlist?: WatchlistOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StockCountOutputType
   */

  export type StockCountOutputType = {
    aiInsights: number
    aiChatLogs: number
    lotSimulations: number
    watchlists: number
  }

  export type StockCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aiInsights?: boolean | StockCountOutputTypeCountAiInsightsArgs
    aiChatLogs?: boolean | StockCountOutputTypeCountAiChatLogsArgs
    lotSimulations?: boolean | StockCountOutputTypeCountLotSimulationsArgs
    watchlists?: boolean | StockCountOutputTypeCountWatchlistsArgs
  }

  // Custom InputTypes
  /**
   * StockCountOutputType without action
   */
  export type StockCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockCountOutputType
     */
    select?: StockCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StockCountOutputType without action
   */
  export type StockCountOutputTypeCountAiInsightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiInsightWhereInput
  }

  /**
   * StockCountOutputType without action
   */
  export type StockCountOutputTypeCountAiChatLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiChatLogWhereInput
  }

  /**
   * StockCountOutputType without action
   */
  export type StockCountOutputTypeCountLotSimulationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LotSimulationWhereInput
  }

  /**
   * StockCountOutputType without action
   */
  export type StockCountOutputTypeCountWatchlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Stock
   */

  export type AggregateStock = {
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  export type StockAvgAggregateOutputType = {
    pricePerShare: number | null
    pricePerLot: number | null
    marketCap: number | null
    revenueGrowth: number | null
    netIncomeGrowth: number | null
    roe: number | null
    per: number | null
    pbv: number | null
    der: number | null
    ipoYear: number | null
    controllingPercentage: number | null
    publicPercentage: number | null
    dividendYield: number | null
    dividendPayoutRatio: number | null
    netProfitMargin: number | null
  }

  export type StockSumAggregateOutputType = {
    pricePerShare: number | null
    pricePerLot: number | null
    marketCap: number | null
    revenueGrowth: number | null
    netIncomeGrowth: number | null
    roe: number | null
    per: number | null
    pbv: number | null
    der: number | null
    ipoYear: number | null
    controllingPercentage: number | null
    publicPercentage: number | null
    dividendYield: number | null
    dividendPayoutRatio: number | null
    netProfitMargin: number | null
  }

  export type StockMinAggregateOutputType = {
    ticker: string | null
    name: string | null
    sector: string | null
    subSector: string | null
    pricePerShare: number | null
    pricePerLot: number | null
    marketCap: number | null
    marketCapLabel: string | null
    revenueGrowth: number | null
    netIncomeGrowth: number | null
    roe: number | null
    per: number | null
    pbv: number | null
    der: number | null
    revenueLabel: string | null
    netIncomeLabel: string | null
    totalAssetsLabel: string | null
    totalEquityLabel: string | null
    period: string | null
    lastUpdated: string | null
    dataSource: string | null
    dataStatus: string | null
    hasData: boolean | null
    description: string | null
    ipoYear: number | null
    listingBoard: string | null
    controllingShareholder: string | null
    controllingPercentage: number | null
    publicShareholder: string | null
    publicPercentage: number | null
    dividendYield: number | null
    dividendPayoutRatio: number | null
    dividendDateNote: string | null
    netProfitMargin: number | null
    keyMoat: string | null
    keyRisk: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockMaxAggregateOutputType = {
    ticker: string | null
    name: string | null
    sector: string | null
    subSector: string | null
    pricePerShare: number | null
    pricePerLot: number | null
    marketCap: number | null
    marketCapLabel: string | null
    revenueGrowth: number | null
    netIncomeGrowth: number | null
    roe: number | null
    per: number | null
    pbv: number | null
    der: number | null
    revenueLabel: string | null
    netIncomeLabel: string | null
    totalAssetsLabel: string | null
    totalEquityLabel: string | null
    period: string | null
    lastUpdated: string | null
    dataSource: string | null
    dataStatus: string | null
    hasData: boolean | null
    description: string | null
    ipoYear: number | null
    listingBoard: string | null
    controllingShareholder: string | null
    controllingPercentage: number | null
    publicShareholder: string | null
    publicPercentage: number | null
    dividendYield: number | null
    dividendPayoutRatio: number | null
    dividendDateNote: string | null
    netProfitMargin: number | null
    keyMoat: string | null
    keyRisk: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockCountAggregateOutputType = {
    ticker: number
    name: number
    sector: number
    subSector: number
    pricePerShare: number
    pricePerLot: number
    marketCap: number
    marketCapLabel: number
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv: number
    der: number
    revenueLabel: number
    netIncomeLabel: number
    totalAssetsLabel: number
    totalEquityLabel: number
    period: number
    lastUpdated: number
    dataSource: number
    dataStatus: number
    hasData: number
    description: number
    ipoYear: number
    listingBoard: number
    controllingShareholder: number
    controllingPercentage: number
    publicShareholder: number
    publicPercentage: number
    businessSegments: number
    dividendYield: number
    dividendPayoutRatio: number
    dividendDateNote: number
    netProfitMargin: number
    sectorSpecificMetric: number
    keyMoat: number
    keyRisk: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StockAvgAggregateInputType = {
    pricePerShare?: true
    pricePerLot?: true
    marketCap?: true
    revenueGrowth?: true
    netIncomeGrowth?: true
    roe?: true
    per?: true
    pbv?: true
    der?: true
    ipoYear?: true
    controllingPercentage?: true
    publicPercentage?: true
    dividendYield?: true
    dividendPayoutRatio?: true
    netProfitMargin?: true
  }

  export type StockSumAggregateInputType = {
    pricePerShare?: true
    pricePerLot?: true
    marketCap?: true
    revenueGrowth?: true
    netIncomeGrowth?: true
    roe?: true
    per?: true
    pbv?: true
    der?: true
    ipoYear?: true
    controllingPercentage?: true
    publicPercentage?: true
    dividendYield?: true
    dividendPayoutRatio?: true
    netProfitMargin?: true
  }

  export type StockMinAggregateInputType = {
    ticker?: true
    name?: true
    sector?: true
    subSector?: true
    pricePerShare?: true
    pricePerLot?: true
    marketCap?: true
    marketCapLabel?: true
    revenueGrowth?: true
    netIncomeGrowth?: true
    roe?: true
    per?: true
    pbv?: true
    der?: true
    revenueLabel?: true
    netIncomeLabel?: true
    totalAssetsLabel?: true
    totalEquityLabel?: true
    period?: true
    lastUpdated?: true
    dataSource?: true
    dataStatus?: true
    hasData?: true
    description?: true
    ipoYear?: true
    listingBoard?: true
    controllingShareholder?: true
    controllingPercentage?: true
    publicShareholder?: true
    publicPercentage?: true
    dividendYield?: true
    dividendPayoutRatio?: true
    dividendDateNote?: true
    netProfitMargin?: true
    keyMoat?: true
    keyRisk?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockMaxAggregateInputType = {
    ticker?: true
    name?: true
    sector?: true
    subSector?: true
    pricePerShare?: true
    pricePerLot?: true
    marketCap?: true
    marketCapLabel?: true
    revenueGrowth?: true
    netIncomeGrowth?: true
    roe?: true
    per?: true
    pbv?: true
    der?: true
    revenueLabel?: true
    netIncomeLabel?: true
    totalAssetsLabel?: true
    totalEquityLabel?: true
    period?: true
    lastUpdated?: true
    dataSource?: true
    dataStatus?: true
    hasData?: true
    description?: true
    ipoYear?: true
    listingBoard?: true
    controllingShareholder?: true
    controllingPercentage?: true
    publicShareholder?: true
    publicPercentage?: true
    dividendYield?: true
    dividendPayoutRatio?: true
    dividendDateNote?: true
    netProfitMargin?: true
    keyMoat?: true
    keyRisk?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockCountAggregateInputType = {
    ticker?: true
    name?: true
    sector?: true
    subSector?: true
    pricePerShare?: true
    pricePerLot?: true
    marketCap?: true
    marketCapLabel?: true
    revenueGrowth?: true
    netIncomeGrowth?: true
    roe?: true
    per?: true
    pbv?: true
    der?: true
    revenueLabel?: true
    netIncomeLabel?: true
    totalAssetsLabel?: true
    totalEquityLabel?: true
    period?: true
    lastUpdated?: true
    dataSource?: true
    dataStatus?: true
    hasData?: true
    description?: true
    ipoYear?: true
    listingBoard?: true
    controllingShareholder?: true
    controllingPercentage?: true
    publicShareholder?: true
    publicPercentage?: true
    businessSegments?: true
    dividendYield?: true
    dividendPayoutRatio?: true
    dividendDateNote?: true
    netProfitMargin?: true
    sectorSpecificMetric?: true
    keyMoat?: true
    keyRisk?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stock to aggregate.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stocks
    **/
    _count?: true | StockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMaxAggregateInputType
  }

  export type GetStockAggregateType<T extends StockAggregateArgs> = {
        [P in keyof T & keyof AggregateStock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStock[P]>
      : GetScalarType<T[P], AggregateStock[P]>
  }




  export type StockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
    orderBy?: StockOrderByWithAggregationInput | StockOrderByWithAggregationInput[]
    by: StockScalarFieldEnum[] | StockScalarFieldEnum
    having?: StockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockCountAggregateInputType | true
    _avg?: StockAvgAggregateInputType
    _sum?: StockSumAggregateInputType
    _min?: StockMinAggregateInputType
    _max?: StockMaxAggregateInputType
  }

  export type StockGroupByOutputType = {
    ticker: string
    name: string
    sector: string
    subSector: string
    pricePerShare: number
    pricePerLot: number
    marketCap: number
    marketCapLabel: string
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv: number | null
    der: number | null
    revenueLabel: string | null
    netIncomeLabel: string | null
    totalAssetsLabel: string | null
    totalEquityLabel: string | null
    period: string
    lastUpdated: string | null
    dataSource: string | null
    dataStatus: string | null
    hasData: boolean
    description: string | null
    ipoYear: number | null
    listingBoard: string | null
    controllingShareholder: string | null
    controllingPercentage: number | null
    publicShareholder: string | null
    publicPercentage: number | null
    businessSegments: JsonValue | null
    dividendYield: number | null
    dividendPayoutRatio: number | null
    dividendDateNote: string | null
    netProfitMargin: number | null
    sectorSpecificMetric: JsonValue | null
    keyMoat: string | null
    keyRisk: string | null
    createdAt: Date
    updatedAt: Date
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  type GetStockGroupByPayload<T extends StockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockGroupByOutputType[P]>
            : GetScalarType<T[P], StockGroupByOutputType[P]>
        }
      >
    >


  export type StockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ticker?: boolean
    name?: boolean
    sector?: boolean
    subSector?: boolean
    pricePerShare?: boolean
    pricePerLot?: boolean
    marketCap?: boolean
    marketCapLabel?: boolean
    revenueGrowth?: boolean
    netIncomeGrowth?: boolean
    roe?: boolean
    per?: boolean
    pbv?: boolean
    der?: boolean
    revenueLabel?: boolean
    netIncomeLabel?: boolean
    totalAssetsLabel?: boolean
    totalEquityLabel?: boolean
    period?: boolean
    lastUpdated?: boolean
    dataSource?: boolean
    dataStatus?: boolean
    hasData?: boolean
    description?: boolean
    ipoYear?: boolean
    listingBoard?: boolean
    controllingShareholder?: boolean
    controllingPercentage?: boolean
    publicShareholder?: boolean
    publicPercentage?: boolean
    businessSegments?: boolean
    dividendYield?: boolean
    dividendPayoutRatio?: boolean
    dividendDateNote?: boolean
    netProfitMargin?: boolean
    sectorSpecificMetric?: boolean
    keyMoat?: boolean
    keyRisk?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aiInsights?: boolean | Stock$aiInsightsArgs<ExtArgs>
    aiChatLogs?: boolean | Stock$aiChatLogsArgs<ExtArgs>
    lotSimulations?: boolean | Stock$lotSimulationsArgs<ExtArgs>
    watchlists?: boolean | Stock$watchlistsArgs<ExtArgs>
    _count?: boolean | StockCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>



  export type StockSelectScalar = {
    ticker?: boolean
    name?: boolean
    sector?: boolean
    subSector?: boolean
    pricePerShare?: boolean
    pricePerLot?: boolean
    marketCap?: boolean
    marketCapLabel?: boolean
    revenueGrowth?: boolean
    netIncomeGrowth?: boolean
    roe?: boolean
    per?: boolean
    pbv?: boolean
    der?: boolean
    revenueLabel?: boolean
    netIncomeLabel?: boolean
    totalAssetsLabel?: boolean
    totalEquityLabel?: boolean
    period?: boolean
    lastUpdated?: boolean
    dataSource?: boolean
    dataStatus?: boolean
    hasData?: boolean
    description?: boolean
    ipoYear?: boolean
    listingBoard?: boolean
    controllingShareholder?: boolean
    controllingPercentage?: boolean
    publicShareholder?: boolean
    publicPercentage?: boolean
    businessSegments?: boolean
    dividendYield?: boolean
    dividendPayoutRatio?: boolean
    dividendDateNote?: boolean
    netProfitMargin?: boolean
    sectorSpecificMetric?: boolean
    keyMoat?: boolean
    keyRisk?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ticker" | "name" | "sector" | "subSector" | "pricePerShare" | "pricePerLot" | "marketCap" | "marketCapLabel" | "revenueGrowth" | "netIncomeGrowth" | "roe" | "per" | "pbv" | "der" | "revenueLabel" | "netIncomeLabel" | "totalAssetsLabel" | "totalEquityLabel" | "period" | "lastUpdated" | "dataSource" | "dataStatus" | "hasData" | "description" | "ipoYear" | "listingBoard" | "controllingShareholder" | "controllingPercentage" | "publicShareholder" | "publicPercentage" | "businessSegments" | "dividendYield" | "dividendPayoutRatio" | "dividendDateNote" | "netProfitMargin" | "sectorSpecificMetric" | "keyMoat" | "keyRisk" | "createdAt" | "updatedAt", ExtArgs["result"]["stock"]>
  export type StockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aiInsights?: boolean | Stock$aiInsightsArgs<ExtArgs>
    aiChatLogs?: boolean | Stock$aiChatLogsArgs<ExtArgs>
    lotSimulations?: boolean | Stock$lotSimulationsArgs<ExtArgs>
    watchlists?: boolean | Stock$watchlistsArgs<ExtArgs>
    _count?: boolean | StockCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $StockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stock"
    objects: {
      aiInsights: Prisma.$AiInsightPayload<ExtArgs>[]
      aiChatLogs: Prisma.$AiChatLogPayload<ExtArgs>[]
      lotSimulations: Prisma.$LotSimulationPayload<ExtArgs>[]
      watchlists: Prisma.$WatchlistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      ticker: string
      name: string
      sector: string
      subSector: string
      pricePerShare: number
      pricePerLot: number
      marketCap: number
      marketCapLabel: string
      revenueGrowth: number
      netIncomeGrowth: number
      roe: number
      per: number
      pbv: number | null
      der: number | null
      revenueLabel: string | null
      netIncomeLabel: string | null
      totalAssetsLabel: string | null
      totalEquityLabel: string | null
      period: string
      lastUpdated: string | null
      dataSource: string | null
      dataStatus: string | null
      hasData: boolean
      description: string | null
      ipoYear: number | null
      listingBoard: string | null
      controllingShareholder: string | null
      controllingPercentage: number | null
      publicShareholder: string | null
      publicPercentage: number | null
      businessSegments: Prisma.JsonValue | null
      dividendYield: number | null
      dividendPayoutRatio: number | null
      dividendDateNote: string | null
      netProfitMargin: number | null
      sectorSpecificMetric: Prisma.JsonValue | null
      keyMoat: string | null
      keyRisk: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stock"]>
    composites: {}
  }

  type StockGetPayload<S extends boolean | null | undefined | StockDefaultArgs> = $Result.GetResult<Prisma.$StockPayload, S>

  type StockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockCountAggregateInputType | true
    }

  export interface StockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stock'], meta: { name: 'Stock' } }
    /**
     * Find zero or one Stock that matches the filter.
     * @param {StockFindUniqueArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockFindUniqueArgs>(args: SelectSubset<T, StockFindUniqueArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockFindUniqueOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockFindUniqueOrThrowArgs>(args: SelectSubset<T, StockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockFindFirstArgs>(args?: SelectSubset<T, StockFindFirstArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockFindFirstOrThrowArgs>(args?: SelectSubset<T, StockFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stocks
     * const stocks = await prisma.stock.findMany()
     * 
     * // Get first 10 Stocks
     * const stocks = await prisma.stock.findMany({ take: 10 })
     * 
     * // Only select the `ticker`
     * const stockWithTickerOnly = await prisma.stock.findMany({ select: { ticker: true } })
     * 
     */
    findMany<T extends StockFindManyArgs>(args?: SelectSubset<T, StockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stock.
     * @param {StockCreateArgs} args - Arguments to create a Stock.
     * @example
     * // Create one Stock
     * const Stock = await prisma.stock.create({
     *   data: {
     *     // ... data to create a Stock
     *   }
     * })
     * 
     */
    create<T extends StockCreateArgs>(args: SelectSubset<T, StockCreateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stocks.
     * @param {StockCreateManyArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockCreateManyArgs>(args?: SelectSubset<T, StockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Stock.
     * @param {StockDeleteArgs} args - Arguments to delete one Stock.
     * @example
     * // Delete one Stock
     * const Stock = await prisma.stock.delete({
     *   where: {
     *     // ... filter to delete one Stock
     *   }
     * })
     * 
     */
    delete<T extends StockDeleteArgs>(args: SelectSubset<T, StockDeleteArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stock.
     * @param {StockUpdateArgs} args - Arguments to update one Stock.
     * @example
     * // Update one Stock
     * const stock = await prisma.stock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockUpdateArgs>(args: SelectSubset<T, StockUpdateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stocks.
     * @param {StockDeleteManyArgs} args - Arguments to filter Stocks to delete.
     * @example
     * // Delete a few Stocks
     * const { count } = await prisma.stock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockDeleteManyArgs>(args?: SelectSubset<T, StockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockUpdateManyArgs>(args: SelectSubset<T, StockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Stock.
     * @param {StockUpsertArgs} args - Arguments to update or create a Stock.
     * @example
     * // Update or create a Stock
     * const stock = await prisma.stock.upsert({
     *   create: {
     *     // ... data to create a Stock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stock we want to update
     *   }
     * })
     */
    upsert<T extends StockUpsertArgs>(args: SelectSubset<T, StockUpsertArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockCountArgs} args - Arguments to filter Stocks to count.
     * @example
     * // Count the number of Stocks
     * const count = await prisma.stock.count({
     *   where: {
     *     // ... the filter for the Stocks we want to count
     *   }
     * })
    **/
    count<T extends StockCountArgs>(
      args?: Subset<T, StockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockAggregateArgs>(args: Subset<T, StockAggregateArgs>): Prisma.PrismaPromise<GetStockAggregateType<T>>

    /**
     * Group by Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockGroupByArgs['orderBy'] }
        : { orderBy?: StockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stock model
   */
  readonly fields: StockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aiInsights<T extends Stock$aiInsightsArgs<ExtArgs> = {}>(args?: Subset<T, Stock$aiInsightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiInsightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    aiChatLogs<T extends Stock$aiChatLogsArgs<ExtArgs> = {}>(args?: Subset<T, Stock$aiChatLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lotSimulations<T extends Stock$lotSimulationsArgs<ExtArgs> = {}>(args?: Subset<T, Stock$lotSimulationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotSimulationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watchlists<T extends Stock$watchlistsArgs<ExtArgs> = {}>(args?: Subset<T, Stock$watchlistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stock model
   */
  interface StockFieldRefs {
    readonly ticker: FieldRef<"Stock", 'String'>
    readonly name: FieldRef<"Stock", 'String'>
    readonly sector: FieldRef<"Stock", 'String'>
    readonly subSector: FieldRef<"Stock", 'String'>
    readonly pricePerShare: FieldRef<"Stock", 'Float'>
    readonly pricePerLot: FieldRef<"Stock", 'Float'>
    readonly marketCap: FieldRef<"Stock", 'Float'>
    readonly marketCapLabel: FieldRef<"Stock", 'String'>
    readonly revenueGrowth: FieldRef<"Stock", 'Float'>
    readonly netIncomeGrowth: FieldRef<"Stock", 'Float'>
    readonly roe: FieldRef<"Stock", 'Float'>
    readonly per: FieldRef<"Stock", 'Float'>
    readonly pbv: FieldRef<"Stock", 'Float'>
    readonly der: FieldRef<"Stock", 'Float'>
    readonly revenueLabel: FieldRef<"Stock", 'String'>
    readonly netIncomeLabel: FieldRef<"Stock", 'String'>
    readonly totalAssetsLabel: FieldRef<"Stock", 'String'>
    readonly totalEquityLabel: FieldRef<"Stock", 'String'>
    readonly period: FieldRef<"Stock", 'String'>
    readonly lastUpdated: FieldRef<"Stock", 'String'>
    readonly dataSource: FieldRef<"Stock", 'String'>
    readonly dataStatus: FieldRef<"Stock", 'String'>
    readonly hasData: FieldRef<"Stock", 'Boolean'>
    readonly description: FieldRef<"Stock", 'String'>
    readonly ipoYear: FieldRef<"Stock", 'Int'>
    readonly listingBoard: FieldRef<"Stock", 'String'>
    readonly controllingShareholder: FieldRef<"Stock", 'String'>
    readonly controllingPercentage: FieldRef<"Stock", 'Float'>
    readonly publicShareholder: FieldRef<"Stock", 'String'>
    readonly publicPercentage: FieldRef<"Stock", 'Float'>
    readonly businessSegments: FieldRef<"Stock", 'Json'>
    readonly dividendYield: FieldRef<"Stock", 'Float'>
    readonly dividendPayoutRatio: FieldRef<"Stock", 'Float'>
    readonly dividendDateNote: FieldRef<"Stock", 'String'>
    readonly netProfitMargin: FieldRef<"Stock", 'Float'>
    readonly sectorSpecificMetric: FieldRef<"Stock", 'Json'>
    readonly keyMoat: FieldRef<"Stock", 'String'>
    readonly keyRisk: FieldRef<"Stock", 'String'>
    readonly createdAt: FieldRef<"Stock", 'DateTime'>
    readonly updatedAt: FieldRef<"Stock", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Stock findUnique
   */
  export type StockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findUniqueOrThrow
   */
  export type StockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findFirst
   */
  export type StockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findFirstOrThrow
   */
  export type StockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findMany
   */
  export type StockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stocks to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock create
   */
  export type StockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to create a Stock.
     */
    data: XOR<StockCreateInput, StockUncheckedCreateInput>
  }

  /**
   * Stock createMany
   */
  export type StockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stock update
   */
  export type StockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to update a Stock.
     */
    data: XOR<StockUpdateInput, StockUncheckedUpdateInput>
    /**
     * Choose, which Stock to update.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock updateMany
   */
  export type StockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to update.
     */
    limit?: number
  }

  /**
   * Stock upsert
   */
  export type StockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The filter to search for the Stock to update in case it exists.
     */
    where: StockWhereUniqueInput
    /**
     * In case the Stock found by the `where` argument doesn't exist, create a new Stock with this data.
     */
    create: XOR<StockCreateInput, StockUncheckedCreateInput>
    /**
     * In case the Stock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockUpdateInput, StockUncheckedUpdateInput>
  }

  /**
   * Stock delete
   */
  export type StockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter which Stock to delete.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock deleteMany
   */
  export type StockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stocks to delete
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to delete.
     */
    limit?: number
  }

  /**
   * Stock.aiInsights
   */
  export type Stock$aiInsightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInsight
     */
    select?: AiInsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiInsight
     */
    omit?: AiInsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInsightInclude<ExtArgs> | null
    where?: AiInsightWhereInput
    orderBy?: AiInsightOrderByWithRelationInput | AiInsightOrderByWithRelationInput[]
    cursor?: AiInsightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiInsightScalarFieldEnum | AiInsightScalarFieldEnum[]
  }

  /**
   * Stock.aiChatLogs
   */
  export type Stock$aiChatLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatLog
     */
    select?: AiChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatLog
     */
    omit?: AiChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatLogInclude<ExtArgs> | null
    where?: AiChatLogWhereInput
    orderBy?: AiChatLogOrderByWithRelationInput | AiChatLogOrderByWithRelationInput[]
    cursor?: AiChatLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiChatLogScalarFieldEnum | AiChatLogScalarFieldEnum[]
  }

  /**
   * Stock.lotSimulations
   */
  export type Stock$lotSimulationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotSimulation
     */
    select?: LotSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotSimulation
     */
    omit?: LotSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotSimulationInclude<ExtArgs> | null
    where?: LotSimulationWhereInput
    orderBy?: LotSimulationOrderByWithRelationInput | LotSimulationOrderByWithRelationInput[]
    cursor?: LotSimulationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LotSimulationScalarFieldEnum | LotSimulationScalarFieldEnum[]
  }

  /**
   * Stock.watchlists
   */
  export type Stock$watchlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    where?: WatchlistWhereInput
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    cursor?: WatchlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * Stock without action
   */
  export type StockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
  }


  /**
   * Model AiInsight
   */

  export type AggregateAiInsight = {
    _count: AiInsightCountAggregateOutputType | null
    _min: AiInsightMinAggregateOutputType | null
    _max: AiInsightMaxAggregateOutputType | null
  }

  export type AiInsightMinAggregateOutputType = {
    id: string | null
    stockTicker: string | null
    period: string | null
    summary: string | null
    disclaimer: string | null
    lastUpdated: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiInsightMaxAggregateOutputType = {
    id: string | null
    stockTicker: string | null
    period: string | null
    summary: string | null
    disclaimer: string | null
    lastUpdated: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiInsightCountAggregateOutputType = {
    id: number
    stockTicker: number
    period: number
    summary: number
    strengths: number
    considerations: number
    factPoints: number
    interpretationPoints: number
    disclaimer: number
    lastUpdated: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AiInsightMinAggregateInputType = {
    id?: true
    stockTicker?: true
    period?: true
    summary?: true
    disclaimer?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiInsightMaxAggregateInputType = {
    id?: true
    stockTicker?: true
    period?: true
    summary?: true
    disclaimer?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiInsightCountAggregateInputType = {
    id?: true
    stockTicker?: true
    period?: true
    summary?: true
    strengths?: true
    considerations?: true
    factPoints?: true
    interpretationPoints?: true
    disclaimer?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AiInsightAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiInsight to aggregate.
     */
    where?: AiInsightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiInsights to fetch.
     */
    orderBy?: AiInsightOrderByWithRelationInput | AiInsightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiInsightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiInsights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiInsights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiInsights
    **/
    _count?: true | AiInsightCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiInsightMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiInsightMaxAggregateInputType
  }

  export type GetAiInsightAggregateType<T extends AiInsightAggregateArgs> = {
        [P in keyof T & keyof AggregateAiInsight]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiInsight[P]>
      : GetScalarType<T[P], AggregateAiInsight[P]>
  }




  export type AiInsightGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiInsightWhereInput
    orderBy?: AiInsightOrderByWithAggregationInput | AiInsightOrderByWithAggregationInput[]
    by: AiInsightScalarFieldEnum[] | AiInsightScalarFieldEnum
    having?: AiInsightScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiInsightCountAggregateInputType | true
    _min?: AiInsightMinAggregateInputType
    _max?: AiInsightMaxAggregateInputType
  }

  export type AiInsightGroupByOutputType = {
    id: string
    stockTicker: string
    period: string
    summary: string
    strengths: JsonValue
    considerations: JsonValue
    factPoints: JsonValue | null
    interpretationPoints: JsonValue | null
    disclaimer: string | null
    lastUpdated: string | null
    createdAt: Date
    updatedAt: Date
    _count: AiInsightCountAggregateOutputType | null
    _min: AiInsightMinAggregateOutputType | null
    _max: AiInsightMaxAggregateOutputType | null
  }

  type GetAiInsightGroupByPayload<T extends AiInsightGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiInsightGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiInsightGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiInsightGroupByOutputType[P]>
            : GetScalarType<T[P], AiInsightGroupByOutputType[P]>
        }
      >
    >


  export type AiInsightSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stockTicker?: boolean
    period?: boolean
    summary?: boolean
    strengths?: boolean
    considerations?: boolean
    factPoints?: boolean
    interpretationPoints?: boolean
    disclaimer?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiInsight"]>



  export type AiInsightSelectScalar = {
    id?: boolean
    stockTicker?: boolean
    period?: boolean
    summary?: boolean
    strengths?: boolean
    considerations?: boolean
    factPoints?: boolean
    interpretationPoints?: boolean
    disclaimer?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AiInsightOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stockTicker" | "period" | "summary" | "strengths" | "considerations" | "factPoints" | "interpretationPoints" | "disclaimer" | "lastUpdated" | "createdAt" | "updatedAt", ExtArgs["result"]["aiInsight"]>
  export type AiInsightInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }

  export type $AiInsightPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiInsight"
    objects: {
      stock: Prisma.$StockPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stockTicker: string
      period: string
      summary: string
      strengths: Prisma.JsonValue
      considerations: Prisma.JsonValue
      factPoints: Prisma.JsonValue | null
      interpretationPoints: Prisma.JsonValue | null
      disclaimer: string | null
      lastUpdated: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aiInsight"]>
    composites: {}
  }

  type AiInsightGetPayload<S extends boolean | null | undefined | AiInsightDefaultArgs> = $Result.GetResult<Prisma.$AiInsightPayload, S>

  type AiInsightCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiInsightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiInsightCountAggregateInputType | true
    }

  export interface AiInsightDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiInsight'], meta: { name: 'AiInsight' } }
    /**
     * Find zero or one AiInsight that matches the filter.
     * @param {AiInsightFindUniqueArgs} args - Arguments to find a AiInsight
     * @example
     * // Get one AiInsight
     * const aiInsight = await prisma.aiInsight.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiInsightFindUniqueArgs>(args: SelectSubset<T, AiInsightFindUniqueArgs<ExtArgs>>): Prisma__AiInsightClient<$Result.GetResult<Prisma.$AiInsightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiInsight that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiInsightFindUniqueOrThrowArgs} args - Arguments to find a AiInsight
     * @example
     * // Get one AiInsight
     * const aiInsight = await prisma.aiInsight.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiInsightFindUniqueOrThrowArgs>(args: SelectSubset<T, AiInsightFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiInsightClient<$Result.GetResult<Prisma.$AiInsightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiInsight that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInsightFindFirstArgs} args - Arguments to find a AiInsight
     * @example
     * // Get one AiInsight
     * const aiInsight = await prisma.aiInsight.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiInsightFindFirstArgs>(args?: SelectSubset<T, AiInsightFindFirstArgs<ExtArgs>>): Prisma__AiInsightClient<$Result.GetResult<Prisma.$AiInsightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiInsight that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInsightFindFirstOrThrowArgs} args - Arguments to find a AiInsight
     * @example
     * // Get one AiInsight
     * const aiInsight = await prisma.aiInsight.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiInsightFindFirstOrThrowArgs>(args?: SelectSubset<T, AiInsightFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiInsightClient<$Result.GetResult<Prisma.$AiInsightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiInsights that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInsightFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiInsights
     * const aiInsights = await prisma.aiInsight.findMany()
     * 
     * // Get first 10 AiInsights
     * const aiInsights = await prisma.aiInsight.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiInsightWithIdOnly = await prisma.aiInsight.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiInsightFindManyArgs>(args?: SelectSubset<T, AiInsightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiInsightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiInsight.
     * @param {AiInsightCreateArgs} args - Arguments to create a AiInsight.
     * @example
     * // Create one AiInsight
     * const AiInsight = await prisma.aiInsight.create({
     *   data: {
     *     // ... data to create a AiInsight
     *   }
     * })
     * 
     */
    create<T extends AiInsightCreateArgs>(args: SelectSubset<T, AiInsightCreateArgs<ExtArgs>>): Prisma__AiInsightClient<$Result.GetResult<Prisma.$AiInsightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiInsights.
     * @param {AiInsightCreateManyArgs} args - Arguments to create many AiInsights.
     * @example
     * // Create many AiInsights
     * const aiInsight = await prisma.aiInsight.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiInsightCreateManyArgs>(args?: SelectSubset<T, AiInsightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AiInsight.
     * @param {AiInsightDeleteArgs} args - Arguments to delete one AiInsight.
     * @example
     * // Delete one AiInsight
     * const AiInsight = await prisma.aiInsight.delete({
     *   where: {
     *     // ... filter to delete one AiInsight
     *   }
     * })
     * 
     */
    delete<T extends AiInsightDeleteArgs>(args: SelectSubset<T, AiInsightDeleteArgs<ExtArgs>>): Prisma__AiInsightClient<$Result.GetResult<Prisma.$AiInsightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiInsight.
     * @param {AiInsightUpdateArgs} args - Arguments to update one AiInsight.
     * @example
     * // Update one AiInsight
     * const aiInsight = await prisma.aiInsight.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiInsightUpdateArgs>(args: SelectSubset<T, AiInsightUpdateArgs<ExtArgs>>): Prisma__AiInsightClient<$Result.GetResult<Prisma.$AiInsightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiInsights.
     * @param {AiInsightDeleteManyArgs} args - Arguments to filter AiInsights to delete.
     * @example
     * // Delete a few AiInsights
     * const { count } = await prisma.aiInsight.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiInsightDeleteManyArgs>(args?: SelectSubset<T, AiInsightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiInsights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInsightUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiInsights
     * const aiInsight = await prisma.aiInsight.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiInsightUpdateManyArgs>(args: SelectSubset<T, AiInsightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AiInsight.
     * @param {AiInsightUpsertArgs} args - Arguments to update or create a AiInsight.
     * @example
     * // Update or create a AiInsight
     * const aiInsight = await prisma.aiInsight.upsert({
     *   create: {
     *     // ... data to create a AiInsight
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiInsight we want to update
     *   }
     * })
     */
    upsert<T extends AiInsightUpsertArgs>(args: SelectSubset<T, AiInsightUpsertArgs<ExtArgs>>): Prisma__AiInsightClient<$Result.GetResult<Prisma.$AiInsightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiInsights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInsightCountArgs} args - Arguments to filter AiInsights to count.
     * @example
     * // Count the number of AiInsights
     * const count = await prisma.aiInsight.count({
     *   where: {
     *     // ... the filter for the AiInsights we want to count
     *   }
     * })
    **/
    count<T extends AiInsightCountArgs>(
      args?: Subset<T, AiInsightCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiInsightCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiInsight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInsightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiInsightAggregateArgs>(args: Subset<T, AiInsightAggregateArgs>): Prisma.PrismaPromise<GetAiInsightAggregateType<T>>

    /**
     * Group by AiInsight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiInsightGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiInsightGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiInsightGroupByArgs['orderBy'] }
        : { orderBy?: AiInsightGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiInsightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiInsightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiInsight model
   */
  readonly fields: AiInsightFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiInsight.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiInsightClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stock<T extends StockDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockDefaultArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiInsight model
   */
  interface AiInsightFieldRefs {
    readonly id: FieldRef<"AiInsight", 'String'>
    readonly stockTicker: FieldRef<"AiInsight", 'String'>
    readonly period: FieldRef<"AiInsight", 'String'>
    readonly summary: FieldRef<"AiInsight", 'String'>
    readonly strengths: FieldRef<"AiInsight", 'Json'>
    readonly considerations: FieldRef<"AiInsight", 'Json'>
    readonly factPoints: FieldRef<"AiInsight", 'Json'>
    readonly interpretationPoints: FieldRef<"AiInsight", 'Json'>
    readonly disclaimer: FieldRef<"AiInsight", 'String'>
    readonly lastUpdated: FieldRef<"AiInsight", 'String'>
    readonly createdAt: FieldRef<"AiInsight", 'DateTime'>
    readonly updatedAt: FieldRef<"AiInsight", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiInsight findUnique
   */
  export type AiInsightFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInsight
     */
    select?: AiInsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiInsight
     */
    omit?: AiInsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInsightInclude<ExtArgs> | null
    /**
     * Filter, which AiInsight to fetch.
     */
    where: AiInsightWhereUniqueInput
  }

  /**
   * AiInsight findUniqueOrThrow
   */
  export type AiInsightFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInsight
     */
    select?: AiInsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiInsight
     */
    omit?: AiInsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInsightInclude<ExtArgs> | null
    /**
     * Filter, which AiInsight to fetch.
     */
    where: AiInsightWhereUniqueInput
  }

  /**
   * AiInsight findFirst
   */
  export type AiInsightFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInsight
     */
    select?: AiInsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiInsight
     */
    omit?: AiInsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInsightInclude<ExtArgs> | null
    /**
     * Filter, which AiInsight to fetch.
     */
    where?: AiInsightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiInsights to fetch.
     */
    orderBy?: AiInsightOrderByWithRelationInput | AiInsightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiInsights.
     */
    cursor?: AiInsightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiInsights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiInsights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiInsights.
     */
    distinct?: AiInsightScalarFieldEnum | AiInsightScalarFieldEnum[]
  }

  /**
   * AiInsight findFirstOrThrow
   */
  export type AiInsightFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInsight
     */
    select?: AiInsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiInsight
     */
    omit?: AiInsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInsightInclude<ExtArgs> | null
    /**
     * Filter, which AiInsight to fetch.
     */
    where?: AiInsightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiInsights to fetch.
     */
    orderBy?: AiInsightOrderByWithRelationInput | AiInsightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiInsights.
     */
    cursor?: AiInsightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiInsights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiInsights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiInsights.
     */
    distinct?: AiInsightScalarFieldEnum | AiInsightScalarFieldEnum[]
  }

  /**
   * AiInsight findMany
   */
  export type AiInsightFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInsight
     */
    select?: AiInsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiInsight
     */
    omit?: AiInsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInsightInclude<ExtArgs> | null
    /**
     * Filter, which AiInsights to fetch.
     */
    where?: AiInsightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiInsights to fetch.
     */
    orderBy?: AiInsightOrderByWithRelationInput | AiInsightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiInsights.
     */
    cursor?: AiInsightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiInsights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiInsights.
     */
    skip?: number
    distinct?: AiInsightScalarFieldEnum | AiInsightScalarFieldEnum[]
  }

  /**
   * AiInsight create
   */
  export type AiInsightCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInsight
     */
    select?: AiInsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiInsight
     */
    omit?: AiInsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInsightInclude<ExtArgs> | null
    /**
     * The data needed to create a AiInsight.
     */
    data: XOR<AiInsightCreateInput, AiInsightUncheckedCreateInput>
  }

  /**
   * AiInsight createMany
   */
  export type AiInsightCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiInsights.
     */
    data: AiInsightCreateManyInput | AiInsightCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiInsight update
   */
  export type AiInsightUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInsight
     */
    select?: AiInsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiInsight
     */
    omit?: AiInsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInsightInclude<ExtArgs> | null
    /**
     * The data needed to update a AiInsight.
     */
    data: XOR<AiInsightUpdateInput, AiInsightUncheckedUpdateInput>
    /**
     * Choose, which AiInsight to update.
     */
    where: AiInsightWhereUniqueInput
  }

  /**
   * AiInsight updateMany
   */
  export type AiInsightUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiInsights.
     */
    data: XOR<AiInsightUpdateManyMutationInput, AiInsightUncheckedUpdateManyInput>
    /**
     * Filter which AiInsights to update
     */
    where?: AiInsightWhereInput
    /**
     * Limit how many AiInsights to update.
     */
    limit?: number
  }

  /**
   * AiInsight upsert
   */
  export type AiInsightUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInsight
     */
    select?: AiInsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiInsight
     */
    omit?: AiInsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInsightInclude<ExtArgs> | null
    /**
     * The filter to search for the AiInsight to update in case it exists.
     */
    where: AiInsightWhereUniqueInput
    /**
     * In case the AiInsight found by the `where` argument doesn't exist, create a new AiInsight with this data.
     */
    create: XOR<AiInsightCreateInput, AiInsightUncheckedCreateInput>
    /**
     * In case the AiInsight was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiInsightUpdateInput, AiInsightUncheckedUpdateInput>
  }

  /**
   * AiInsight delete
   */
  export type AiInsightDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInsight
     */
    select?: AiInsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiInsight
     */
    omit?: AiInsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInsightInclude<ExtArgs> | null
    /**
     * Filter which AiInsight to delete.
     */
    where: AiInsightWhereUniqueInput
  }

  /**
   * AiInsight deleteMany
   */
  export type AiInsightDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiInsights to delete
     */
    where?: AiInsightWhereInput
    /**
     * Limit how many AiInsights to delete.
     */
    limit?: number
  }

  /**
   * AiInsight without action
   */
  export type AiInsightDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiInsight
     */
    select?: AiInsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiInsight
     */
    omit?: AiInsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiInsightInclude<ExtArgs> | null
  }


  /**
   * Model AiChatLog
   */

  export type AggregateAiChatLog = {
    _count: AiChatLogCountAggregateOutputType | null
    _min: AiChatLogMinAggregateOutputType | null
    _max: AiChatLogMaxAggregateOutputType | null
  }

  export type AiChatLogMinAggregateOutputType = {
    id: string | null
    userEmail: string | null
    stockTicker: string | null
    sender: string | null
    message: string | null
    period: string | null
    createdAt: Date | null
  }

  export type AiChatLogMaxAggregateOutputType = {
    id: string | null
    userEmail: string | null
    stockTicker: string | null
    sender: string | null
    message: string | null
    period: string | null
    createdAt: Date | null
  }

  export type AiChatLogCountAggregateOutputType = {
    id: number
    userEmail: number
    stockTicker: number
    sender: number
    message: number
    period: number
    createdAt: number
    _all: number
  }


  export type AiChatLogMinAggregateInputType = {
    id?: true
    userEmail?: true
    stockTicker?: true
    sender?: true
    message?: true
    period?: true
    createdAt?: true
  }

  export type AiChatLogMaxAggregateInputType = {
    id?: true
    userEmail?: true
    stockTicker?: true
    sender?: true
    message?: true
    period?: true
    createdAt?: true
  }

  export type AiChatLogCountAggregateInputType = {
    id?: true
    userEmail?: true
    stockTicker?: true
    sender?: true
    message?: true
    period?: true
    createdAt?: true
    _all?: true
  }

  export type AiChatLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiChatLog to aggregate.
     */
    where?: AiChatLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatLogs to fetch.
     */
    orderBy?: AiChatLogOrderByWithRelationInput | AiChatLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiChatLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiChatLogs
    **/
    _count?: true | AiChatLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiChatLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiChatLogMaxAggregateInputType
  }

  export type GetAiChatLogAggregateType<T extends AiChatLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAiChatLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiChatLog[P]>
      : GetScalarType<T[P], AggregateAiChatLog[P]>
  }




  export type AiChatLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiChatLogWhereInput
    orderBy?: AiChatLogOrderByWithAggregationInput | AiChatLogOrderByWithAggregationInput[]
    by: AiChatLogScalarFieldEnum[] | AiChatLogScalarFieldEnum
    having?: AiChatLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiChatLogCountAggregateInputType | true
    _min?: AiChatLogMinAggregateInputType
    _max?: AiChatLogMaxAggregateInputType
  }

  export type AiChatLogGroupByOutputType = {
    id: string
    userEmail: string
    stockTicker: string
    sender: string
    message: string
    period: string | null
    createdAt: Date
    _count: AiChatLogCountAggregateOutputType | null
    _min: AiChatLogMinAggregateOutputType | null
    _max: AiChatLogMaxAggregateOutputType | null
  }

  type GetAiChatLogGroupByPayload<T extends AiChatLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiChatLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiChatLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiChatLogGroupByOutputType[P]>
            : GetScalarType<T[P], AiChatLogGroupByOutputType[P]>
        }
      >
    >


  export type AiChatLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    stockTicker?: boolean
    sender?: boolean
    message?: boolean
    period?: boolean
    createdAt?: boolean
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiChatLog"]>



  export type AiChatLogSelectScalar = {
    id?: boolean
    userEmail?: boolean
    stockTicker?: boolean
    sender?: boolean
    message?: boolean
    period?: boolean
    createdAt?: boolean
  }

  export type AiChatLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userEmail" | "stockTicker" | "sender" | "message" | "period" | "createdAt", ExtArgs["result"]["aiChatLog"]>
  export type AiChatLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }

  export type $AiChatLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiChatLog"
    objects: {
      stock: Prisma.$StockPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userEmail: string
      stockTicker: string
      sender: string
      message: string
      period: string | null
      createdAt: Date
    }, ExtArgs["result"]["aiChatLog"]>
    composites: {}
  }

  type AiChatLogGetPayload<S extends boolean | null | undefined | AiChatLogDefaultArgs> = $Result.GetResult<Prisma.$AiChatLogPayload, S>

  type AiChatLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiChatLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiChatLogCountAggregateInputType | true
    }

  export interface AiChatLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiChatLog'], meta: { name: 'AiChatLog' } }
    /**
     * Find zero or one AiChatLog that matches the filter.
     * @param {AiChatLogFindUniqueArgs} args - Arguments to find a AiChatLog
     * @example
     * // Get one AiChatLog
     * const aiChatLog = await prisma.aiChatLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiChatLogFindUniqueArgs>(args: SelectSubset<T, AiChatLogFindUniqueArgs<ExtArgs>>): Prisma__AiChatLogClient<$Result.GetResult<Prisma.$AiChatLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiChatLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiChatLogFindUniqueOrThrowArgs} args - Arguments to find a AiChatLog
     * @example
     * // Get one AiChatLog
     * const aiChatLog = await prisma.aiChatLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiChatLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AiChatLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiChatLogClient<$Result.GetResult<Prisma.$AiChatLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiChatLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatLogFindFirstArgs} args - Arguments to find a AiChatLog
     * @example
     * // Get one AiChatLog
     * const aiChatLog = await prisma.aiChatLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiChatLogFindFirstArgs>(args?: SelectSubset<T, AiChatLogFindFirstArgs<ExtArgs>>): Prisma__AiChatLogClient<$Result.GetResult<Prisma.$AiChatLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiChatLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatLogFindFirstOrThrowArgs} args - Arguments to find a AiChatLog
     * @example
     * // Get one AiChatLog
     * const aiChatLog = await prisma.aiChatLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiChatLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AiChatLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiChatLogClient<$Result.GetResult<Prisma.$AiChatLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiChatLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiChatLogs
     * const aiChatLogs = await prisma.aiChatLog.findMany()
     * 
     * // Get first 10 AiChatLogs
     * const aiChatLogs = await prisma.aiChatLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiChatLogWithIdOnly = await prisma.aiChatLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiChatLogFindManyArgs>(args?: SelectSubset<T, AiChatLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiChatLog.
     * @param {AiChatLogCreateArgs} args - Arguments to create a AiChatLog.
     * @example
     * // Create one AiChatLog
     * const AiChatLog = await prisma.aiChatLog.create({
     *   data: {
     *     // ... data to create a AiChatLog
     *   }
     * })
     * 
     */
    create<T extends AiChatLogCreateArgs>(args: SelectSubset<T, AiChatLogCreateArgs<ExtArgs>>): Prisma__AiChatLogClient<$Result.GetResult<Prisma.$AiChatLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiChatLogs.
     * @param {AiChatLogCreateManyArgs} args - Arguments to create many AiChatLogs.
     * @example
     * // Create many AiChatLogs
     * const aiChatLog = await prisma.aiChatLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiChatLogCreateManyArgs>(args?: SelectSubset<T, AiChatLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AiChatLog.
     * @param {AiChatLogDeleteArgs} args - Arguments to delete one AiChatLog.
     * @example
     * // Delete one AiChatLog
     * const AiChatLog = await prisma.aiChatLog.delete({
     *   where: {
     *     // ... filter to delete one AiChatLog
     *   }
     * })
     * 
     */
    delete<T extends AiChatLogDeleteArgs>(args: SelectSubset<T, AiChatLogDeleteArgs<ExtArgs>>): Prisma__AiChatLogClient<$Result.GetResult<Prisma.$AiChatLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiChatLog.
     * @param {AiChatLogUpdateArgs} args - Arguments to update one AiChatLog.
     * @example
     * // Update one AiChatLog
     * const aiChatLog = await prisma.aiChatLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiChatLogUpdateArgs>(args: SelectSubset<T, AiChatLogUpdateArgs<ExtArgs>>): Prisma__AiChatLogClient<$Result.GetResult<Prisma.$AiChatLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiChatLogs.
     * @param {AiChatLogDeleteManyArgs} args - Arguments to filter AiChatLogs to delete.
     * @example
     * // Delete a few AiChatLogs
     * const { count } = await prisma.aiChatLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiChatLogDeleteManyArgs>(args?: SelectSubset<T, AiChatLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiChatLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiChatLogs
     * const aiChatLog = await prisma.aiChatLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiChatLogUpdateManyArgs>(args: SelectSubset<T, AiChatLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AiChatLog.
     * @param {AiChatLogUpsertArgs} args - Arguments to update or create a AiChatLog.
     * @example
     * // Update or create a AiChatLog
     * const aiChatLog = await prisma.aiChatLog.upsert({
     *   create: {
     *     // ... data to create a AiChatLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiChatLog we want to update
     *   }
     * })
     */
    upsert<T extends AiChatLogUpsertArgs>(args: SelectSubset<T, AiChatLogUpsertArgs<ExtArgs>>): Prisma__AiChatLogClient<$Result.GetResult<Prisma.$AiChatLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiChatLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatLogCountArgs} args - Arguments to filter AiChatLogs to count.
     * @example
     * // Count the number of AiChatLogs
     * const count = await prisma.aiChatLog.count({
     *   where: {
     *     // ... the filter for the AiChatLogs we want to count
     *   }
     * })
    **/
    count<T extends AiChatLogCountArgs>(
      args?: Subset<T, AiChatLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiChatLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiChatLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiChatLogAggregateArgs>(args: Subset<T, AiChatLogAggregateArgs>): Prisma.PrismaPromise<GetAiChatLogAggregateType<T>>

    /**
     * Group by AiChatLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiChatLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiChatLogGroupByArgs['orderBy'] }
        : { orderBy?: AiChatLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiChatLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiChatLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiChatLog model
   */
  readonly fields: AiChatLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiChatLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiChatLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stock<T extends StockDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockDefaultArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiChatLog model
   */
  interface AiChatLogFieldRefs {
    readonly id: FieldRef<"AiChatLog", 'String'>
    readonly userEmail: FieldRef<"AiChatLog", 'String'>
    readonly stockTicker: FieldRef<"AiChatLog", 'String'>
    readonly sender: FieldRef<"AiChatLog", 'String'>
    readonly message: FieldRef<"AiChatLog", 'String'>
    readonly period: FieldRef<"AiChatLog", 'String'>
    readonly createdAt: FieldRef<"AiChatLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiChatLog findUnique
   */
  export type AiChatLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatLog
     */
    select?: AiChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatLog
     */
    omit?: AiChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatLogInclude<ExtArgs> | null
    /**
     * Filter, which AiChatLog to fetch.
     */
    where: AiChatLogWhereUniqueInput
  }

  /**
   * AiChatLog findUniqueOrThrow
   */
  export type AiChatLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatLog
     */
    select?: AiChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatLog
     */
    omit?: AiChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatLogInclude<ExtArgs> | null
    /**
     * Filter, which AiChatLog to fetch.
     */
    where: AiChatLogWhereUniqueInput
  }

  /**
   * AiChatLog findFirst
   */
  export type AiChatLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatLog
     */
    select?: AiChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatLog
     */
    omit?: AiChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatLogInclude<ExtArgs> | null
    /**
     * Filter, which AiChatLog to fetch.
     */
    where?: AiChatLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatLogs to fetch.
     */
    orderBy?: AiChatLogOrderByWithRelationInput | AiChatLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiChatLogs.
     */
    cursor?: AiChatLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiChatLogs.
     */
    distinct?: AiChatLogScalarFieldEnum | AiChatLogScalarFieldEnum[]
  }

  /**
   * AiChatLog findFirstOrThrow
   */
  export type AiChatLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatLog
     */
    select?: AiChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatLog
     */
    omit?: AiChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatLogInclude<ExtArgs> | null
    /**
     * Filter, which AiChatLog to fetch.
     */
    where?: AiChatLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatLogs to fetch.
     */
    orderBy?: AiChatLogOrderByWithRelationInput | AiChatLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiChatLogs.
     */
    cursor?: AiChatLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiChatLogs.
     */
    distinct?: AiChatLogScalarFieldEnum | AiChatLogScalarFieldEnum[]
  }

  /**
   * AiChatLog findMany
   */
  export type AiChatLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatLog
     */
    select?: AiChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatLog
     */
    omit?: AiChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatLogInclude<ExtArgs> | null
    /**
     * Filter, which AiChatLogs to fetch.
     */
    where?: AiChatLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatLogs to fetch.
     */
    orderBy?: AiChatLogOrderByWithRelationInput | AiChatLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiChatLogs.
     */
    cursor?: AiChatLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatLogs.
     */
    skip?: number
    distinct?: AiChatLogScalarFieldEnum | AiChatLogScalarFieldEnum[]
  }

  /**
   * AiChatLog create
   */
  export type AiChatLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatLog
     */
    select?: AiChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatLog
     */
    omit?: AiChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AiChatLog.
     */
    data: XOR<AiChatLogCreateInput, AiChatLogUncheckedCreateInput>
  }

  /**
   * AiChatLog createMany
   */
  export type AiChatLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiChatLogs.
     */
    data: AiChatLogCreateManyInput | AiChatLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiChatLog update
   */
  export type AiChatLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatLog
     */
    select?: AiChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatLog
     */
    omit?: AiChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AiChatLog.
     */
    data: XOR<AiChatLogUpdateInput, AiChatLogUncheckedUpdateInput>
    /**
     * Choose, which AiChatLog to update.
     */
    where: AiChatLogWhereUniqueInput
  }

  /**
   * AiChatLog updateMany
   */
  export type AiChatLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiChatLogs.
     */
    data: XOR<AiChatLogUpdateManyMutationInput, AiChatLogUncheckedUpdateManyInput>
    /**
     * Filter which AiChatLogs to update
     */
    where?: AiChatLogWhereInput
    /**
     * Limit how many AiChatLogs to update.
     */
    limit?: number
  }

  /**
   * AiChatLog upsert
   */
  export type AiChatLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatLog
     */
    select?: AiChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatLog
     */
    omit?: AiChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AiChatLog to update in case it exists.
     */
    where: AiChatLogWhereUniqueInput
    /**
     * In case the AiChatLog found by the `where` argument doesn't exist, create a new AiChatLog with this data.
     */
    create: XOR<AiChatLogCreateInput, AiChatLogUncheckedCreateInput>
    /**
     * In case the AiChatLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiChatLogUpdateInput, AiChatLogUncheckedUpdateInput>
  }

  /**
   * AiChatLog delete
   */
  export type AiChatLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatLog
     */
    select?: AiChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatLog
     */
    omit?: AiChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatLogInclude<ExtArgs> | null
    /**
     * Filter which AiChatLog to delete.
     */
    where: AiChatLogWhereUniqueInput
  }

  /**
   * AiChatLog deleteMany
   */
  export type AiChatLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiChatLogs to delete
     */
    where?: AiChatLogWhereInput
    /**
     * Limit how many AiChatLogs to delete.
     */
    limit?: number
  }

  /**
   * AiChatLog without action
   */
  export type AiChatLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatLog
     */
    select?: AiChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatLog
     */
    omit?: AiChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatLogInclude<ExtArgs> | null
  }


  /**
   * Model LotSimulation
   */

  export type AggregateLotSimulation = {
    _count: LotSimulationCountAggregateOutputType | null
    _avg: LotSimulationAvgAggregateOutputType | null
    _sum: LotSimulationSumAggregateOutputType | null
    _min: LotSimulationMinAggregateOutputType | null
    _max: LotSimulationMaxAggregateOutputType | null
  }

  export type LotSimulationAvgAggregateOutputType = {
    pricePerShare: number | null
    pricePerLot: number | null
    targetBudget: number | null
    brokerFeePercent: number | null
    calculatedLots: number | null
    totalStockCost: number | null
    brokerFeeAmount: number | null
    totalSpent: number | null
    remainingCash: number | null
  }

  export type LotSimulationSumAggregateOutputType = {
    pricePerShare: number | null
    pricePerLot: number | null
    targetBudget: number | null
    brokerFeePercent: number | null
    calculatedLots: number | null
    totalStockCost: number | null
    brokerFeeAmount: number | null
    totalSpent: number | null
    remainingCash: number | null
  }

  export type LotSimulationMinAggregateOutputType = {
    id: string | null
    stockTicker: string | null
    pricePerShare: number | null
    pricePerLot: number | null
    targetBudget: number | null
    brokerFeePercent: number | null
    calculatedLots: number | null
    totalStockCost: number | null
    brokerFeeAmount: number | null
    totalSpent: number | null
    remainingCash: number | null
    aiCommentary: string | null
    createdAt: Date | null
  }

  export type LotSimulationMaxAggregateOutputType = {
    id: string | null
    stockTicker: string | null
    pricePerShare: number | null
    pricePerLot: number | null
    targetBudget: number | null
    brokerFeePercent: number | null
    calculatedLots: number | null
    totalStockCost: number | null
    brokerFeeAmount: number | null
    totalSpent: number | null
    remainingCash: number | null
    aiCommentary: string | null
    createdAt: Date | null
  }

  export type LotSimulationCountAggregateOutputType = {
    id: number
    stockTicker: number
    pricePerShare: number
    pricePerLot: number
    targetBudget: number
    brokerFeePercent: number
    calculatedLots: number
    totalStockCost: number
    brokerFeeAmount: number
    totalSpent: number
    remainingCash: number
    aiCommentary: number
    createdAt: number
    _all: number
  }


  export type LotSimulationAvgAggregateInputType = {
    pricePerShare?: true
    pricePerLot?: true
    targetBudget?: true
    brokerFeePercent?: true
    calculatedLots?: true
    totalStockCost?: true
    brokerFeeAmount?: true
    totalSpent?: true
    remainingCash?: true
  }

  export type LotSimulationSumAggregateInputType = {
    pricePerShare?: true
    pricePerLot?: true
    targetBudget?: true
    brokerFeePercent?: true
    calculatedLots?: true
    totalStockCost?: true
    brokerFeeAmount?: true
    totalSpent?: true
    remainingCash?: true
  }

  export type LotSimulationMinAggregateInputType = {
    id?: true
    stockTicker?: true
    pricePerShare?: true
    pricePerLot?: true
    targetBudget?: true
    brokerFeePercent?: true
    calculatedLots?: true
    totalStockCost?: true
    brokerFeeAmount?: true
    totalSpent?: true
    remainingCash?: true
    aiCommentary?: true
    createdAt?: true
  }

  export type LotSimulationMaxAggregateInputType = {
    id?: true
    stockTicker?: true
    pricePerShare?: true
    pricePerLot?: true
    targetBudget?: true
    brokerFeePercent?: true
    calculatedLots?: true
    totalStockCost?: true
    brokerFeeAmount?: true
    totalSpent?: true
    remainingCash?: true
    aiCommentary?: true
    createdAt?: true
  }

  export type LotSimulationCountAggregateInputType = {
    id?: true
    stockTicker?: true
    pricePerShare?: true
    pricePerLot?: true
    targetBudget?: true
    brokerFeePercent?: true
    calculatedLots?: true
    totalStockCost?: true
    brokerFeeAmount?: true
    totalSpent?: true
    remainingCash?: true
    aiCommentary?: true
    createdAt?: true
    _all?: true
  }

  export type LotSimulationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LotSimulation to aggregate.
     */
    where?: LotSimulationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LotSimulations to fetch.
     */
    orderBy?: LotSimulationOrderByWithRelationInput | LotSimulationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LotSimulationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LotSimulations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LotSimulations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LotSimulations
    **/
    _count?: true | LotSimulationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LotSimulationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LotSimulationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LotSimulationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LotSimulationMaxAggregateInputType
  }

  export type GetLotSimulationAggregateType<T extends LotSimulationAggregateArgs> = {
        [P in keyof T & keyof AggregateLotSimulation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLotSimulation[P]>
      : GetScalarType<T[P], AggregateLotSimulation[P]>
  }




  export type LotSimulationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LotSimulationWhereInput
    orderBy?: LotSimulationOrderByWithAggregationInput | LotSimulationOrderByWithAggregationInput[]
    by: LotSimulationScalarFieldEnum[] | LotSimulationScalarFieldEnum
    having?: LotSimulationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LotSimulationCountAggregateInputType | true
    _avg?: LotSimulationAvgAggregateInputType
    _sum?: LotSimulationSumAggregateInputType
    _min?: LotSimulationMinAggregateInputType
    _max?: LotSimulationMaxAggregateInputType
  }

  export type LotSimulationGroupByOutputType = {
    id: string
    stockTicker: string
    pricePerShare: number
    pricePerLot: number
    targetBudget: number
    brokerFeePercent: number
    calculatedLots: number
    totalStockCost: number
    brokerFeeAmount: number
    totalSpent: number
    remainingCash: number
    aiCommentary: string | null
    createdAt: Date
    _count: LotSimulationCountAggregateOutputType | null
    _avg: LotSimulationAvgAggregateOutputType | null
    _sum: LotSimulationSumAggregateOutputType | null
    _min: LotSimulationMinAggregateOutputType | null
    _max: LotSimulationMaxAggregateOutputType | null
  }

  type GetLotSimulationGroupByPayload<T extends LotSimulationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LotSimulationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LotSimulationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LotSimulationGroupByOutputType[P]>
            : GetScalarType<T[P], LotSimulationGroupByOutputType[P]>
        }
      >
    >


  export type LotSimulationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stockTicker?: boolean
    pricePerShare?: boolean
    pricePerLot?: boolean
    targetBudget?: boolean
    brokerFeePercent?: boolean
    calculatedLots?: boolean
    totalStockCost?: boolean
    brokerFeeAmount?: boolean
    totalSpent?: boolean
    remainingCash?: boolean
    aiCommentary?: boolean
    createdAt?: boolean
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lotSimulation"]>



  export type LotSimulationSelectScalar = {
    id?: boolean
    stockTicker?: boolean
    pricePerShare?: boolean
    pricePerLot?: boolean
    targetBudget?: boolean
    brokerFeePercent?: boolean
    calculatedLots?: boolean
    totalStockCost?: boolean
    brokerFeeAmount?: boolean
    totalSpent?: boolean
    remainingCash?: boolean
    aiCommentary?: boolean
    createdAt?: boolean
  }

  export type LotSimulationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stockTicker" | "pricePerShare" | "pricePerLot" | "targetBudget" | "brokerFeePercent" | "calculatedLots" | "totalStockCost" | "brokerFeeAmount" | "totalSpent" | "remainingCash" | "aiCommentary" | "createdAt", ExtArgs["result"]["lotSimulation"]>
  export type LotSimulationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }

  export type $LotSimulationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LotSimulation"
    objects: {
      stock: Prisma.$StockPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stockTicker: string
      pricePerShare: number
      pricePerLot: number
      targetBudget: number
      brokerFeePercent: number
      calculatedLots: number
      totalStockCost: number
      brokerFeeAmount: number
      totalSpent: number
      remainingCash: number
      aiCommentary: string | null
      createdAt: Date
    }, ExtArgs["result"]["lotSimulation"]>
    composites: {}
  }

  type LotSimulationGetPayload<S extends boolean | null | undefined | LotSimulationDefaultArgs> = $Result.GetResult<Prisma.$LotSimulationPayload, S>

  type LotSimulationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LotSimulationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LotSimulationCountAggregateInputType | true
    }

  export interface LotSimulationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LotSimulation'], meta: { name: 'LotSimulation' } }
    /**
     * Find zero or one LotSimulation that matches the filter.
     * @param {LotSimulationFindUniqueArgs} args - Arguments to find a LotSimulation
     * @example
     * // Get one LotSimulation
     * const lotSimulation = await prisma.lotSimulation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LotSimulationFindUniqueArgs>(args: SelectSubset<T, LotSimulationFindUniqueArgs<ExtArgs>>): Prisma__LotSimulationClient<$Result.GetResult<Prisma.$LotSimulationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LotSimulation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LotSimulationFindUniqueOrThrowArgs} args - Arguments to find a LotSimulation
     * @example
     * // Get one LotSimulation
     * const lotSimulation = await prisma.lotSimulation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LotSimulationFindUniqueOrThrowArgs>(args: SelectSubset<T, LotSimulationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LotSimulationClient<$Result.GetResult<Prisma.$LotSimulationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LotSimulation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotSimulationFindFirstArgs} args - Arguments to find a LotSimulation
     * @example
     * // Get one LotSimulation
     * const lotSimulation = await prisma.lotSimulation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LotSimulationFindFirstArgs>(args?: SelectSubset<T, LotSimulationFindFirstArgs<ExtArgs>>): Prisma__LotSimulationClient<$Result.GetResult<Prisma.$LotSimulationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LotSimulation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotSimulationFindFirstOrThrowArgs} args - Arguments to find a LotSimulation
     * @example
     * // Get one LotSimulation
     * const lotSimulation = await prisma.lotSimulation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LotSimulationFindFirstOrThrowArgs>(args?: SelectSubset<T, LotSimulationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LotSimulationClient<$Result.GetResult<Prisma.$LotSimulationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LotSimulations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotSimulationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LotSimulations
     * const lotSimulations = await prisma.lotSimulation.findMany()
     * 
     * // Get first 10 LotSimulations
     * const lotSimulations = await prisma.lotSimulation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lotSimulationWithIdOnly = await prisma.lotSimulation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LotSimulationFindManyArgs>(args?: SelectSubset<T, LotSimulationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotSimulationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LotSimulation.
     * @param {LotSimulationCreateArgs} args - Arguments to create a LotSimulation.
     * @example
     * // Create one LotSimulation
     * const LotSimulation = await prisma.lotSimulation.create({
     *   data: {
     *     // ... data to create a LotSimulation
     *   }
     * })
     * 
     */
    create<T extends LotSimulationCreateArgs>(args: SelectSubset<T, LotSimulationCreateArgs<ExtArgs>>): Prisma__LotSimulationClient<$Result.GetResult<Prisma.$LotSimulationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LotSimulations.
     * @param {LotSimulationCreateManyArgs} args - Arguments to create many LotSimulations.
     * @example
     * // Create many LotSimulations
     * const lotSimulation = await prisma.lotSimulation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LotSimulationCreateManyArgs>(args?: SelectSubset<T, LotSimulationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LotSimulation.
     * @param {LotSimulationDeleteArgs} args - Arguments to delete one LotSimulation.
     * @example
     * // Delete one LotSimulation
     * const LotSimulation = await prisma.lotSimulation.delete({
     *   where: {
     *     // ... filter to delete one LotSimulation
     *   }
     * })
     * 
     */
    delete<T extends LotSimulationDeleteArgs>(args: SelectSubset<T, LotSimulationDeleteArgs<ExtArgs>>): Prisma__LotSimulationClient<$Result.GetResult<Prisma.$LotSimulationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LotSimulation.
     * @param {LotSimulationUpdateArgs} args - Arguments to update one LotSimulation.
     * @example
     * // Update one LotSimulation
     * const lotSimulation = await prisma.lotSimulation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LotSimulationUpdateArgs>(args: SelectSubset<T, LotSimulationUpdateArgs<ExtArgs>>): Prisma__LotSimulationClient<$Result.GetResult<Prisma.$LotSimulationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LotSimulations.
     * @param {LotSimulationDeleteManyArgs} args - Arguments to filter LotSimulations to delete.
     * @example
     * // Delete a few LotSimulations
     * const { count } = await prisma.lotSimulation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LotSimulationDeleteManyArgs>(args?: SelectSubset<T, LotSimulationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LotSimulations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotSimulationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LotSimulations
     * const lotSimulation = await prisma.lotSimulation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LotSimulationUpdateManyArgs>(args: SelectSubset<T, LotSimulationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LotSimulation.
     * @param {LotSimulationUpsertArgs} args - Arguments to update or create a LotSimulation.
     * @example
     * // Update or create a LotSimulation
     * const lotSimulation = await prisma.lotSimulation.upsert({
     *   create: {
     *     // ... data to create a LotSimulation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LotSimulation we want to update
     *   }
     * })
     */
    upsert<T extends LotSimulationUpsertArgs>(args: SelectSubset<T, LotSimulationUpsertArgs<ExtArgs>>): Prisma__LotSimulationClient<$Result.GetResult<Prisma.$LotSimulationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LotSimulations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotSimulationCountArgs} args - Arguments to filter LotSimulations to count.
     * @example
     * // Count the number of LotSimulations
     * const count = await prisma.lotSimulation.count({
     *   where: {
     *     // ... the filter for the LotSimulations we want to count
     *   }
     * })
    **/
    count<T extends LotSimulationCountArgs>(
      args?: Subset<T, LotSimulationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LotSimulationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LotSimulation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotSimulationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LotSimulationAggregateArgs>(args: Subset<T, LotSimulationAggregateArgs>): Prisma.PrismaPromise<GetLotSimulationAggregateType<T>>

    /**
     * Group by LotSimulation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LotSimulationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LotSimulationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LotSimulationGroupByArgs['orderBy'] }
        : { orderBy?: LotSimulationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LotSimulationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLotSimulationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LotSimulation model
   */
  readonly fields: LotSimulationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LotSimulation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LotSimulationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stock<T extends StockDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockDefaultArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LotSimulation model
   */
  interface LotSimulationFieldRefs {
    readonly id: FieldRef<"LotSimulation", 'String'>
    readonly stockTicker: FieldRef<"LotSimulation", 'String'>
    readonly pricePerShare: FieldRef<"LotSimulation", 'Float'>
    readonly pricePerLot: FieldRef<"LotSimulation", 'Float'>
    readonly targetBudget: FieldRef<"LotSimulation", 'Float'>
    readonly brokerFeePercent: FieldRef<"LotSimulation", 'Float'>
    readonly calculatedLots: FieldRef<"LotSimulation", 'Int'>
    readonly totalStockCost: FieldRef<"LotSimulation", 'Float'>
    readonly brokerFeeAmount: FieldRef<"LotSimulation", 'Float'>
    readonly totalSpent: FieldRef<"LotSimulation", 'Float'>
    readonly remainingCash: FieldRef<"LotSimulation", 'Float'>
    readonly aiCommentary: FieldRef<"LotSimulation", 'String'>
    readonly createdAt: FieldRef<"LotSimulation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LotSimulation findUnique
   */
  export type LotSimulationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotSimulation
     */
    select?: LotSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotSimulation
     */
    omit?: LotSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotSimulationInclude<ExtArgs> | null
    /**
     * Filter, which LotSimulation to fetch.
     */
    where: LotSimulationWhereUniqueInput
  }

  /**
   * LotSimulation findUniqueOrThrow
   */
  export type LotSimulationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotSimulation
     */
    select?: LotSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotSimulation
     */
    omit?: LotSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotSimulationInclude<ExtArgs> | null
    /**
     * Filter, which LotSimulation to fetch.
     */
    where: LotSimulationWhereUniqueInput
  }

  /**
   * LotSimulation findFirst
   */
  export type LotSimulationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotSimulation
     */
    select?: LotSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotSimulation
     */
    omit?: LotSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotSimulationInclude<ExtArgs> | null
    /**
     * Filter, which LotSimulation to fetch.
     */
    where?: LotSimulationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LotSimulations to fetch.
     */
    orderBy?: LotSimulationOrderByWithRelationInput | LotSimulationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LotSimulations.
     */
    cursor?: LotSimulationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LotSimulations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LotSimulations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LotSimulations.
     */
    distinct?: LotSimulationScalarFieldEnum | LotSimulationScalarFieldEnum[]
  }

  /**
   * LotSimulation findFirstOrThrow
   */
  export type LotSimulationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotSimulation
     */
    select?: LotSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotSimulation
     */
    omit?: LotSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotSimulationInclude<ExtArgs> | null
    /**
     * Filter, which LotSimulation to fetch.
     */
    where?: LotSimulationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LotSimulations to fetch.
     */
    orderBy?: LotSimulationOrderByWithRelationInput | LotSimulationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LotSimulations.
     */
    cursor?: LotSimulationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LotSimulations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LotSimulations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LotSimulations.
     */
    distinct?: LotSimulationScalarFieldEnum | LotSimulationScalarFieldEnum[]
  }

  /**
   * LotSimulation findMany
   */
  export type LotSimulationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotSimulation
     */
    select?: LotSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotSimulation
     */
    omit?: LotSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotSimulationInclude<ExtArgs> | null
    /**
     * Filter, which LotSimulations to fetch.
     */
    where?: LotSimulationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LotSimulations to fetch.
     */
    orderBy?: LotSimulationOrderByWithRelationInput | LotSimulationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LotSimulations.
     */
    cursor?: LotSimulationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LotSimulations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LotSimulations.
     */
    skip?: number
    distinct?: LotSimulationScalarFieldEnum | LotSimulationScalarFieldEnum[]
  }

  /**
   * LotSimulation create
   */
  export type LotSimulationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotSimulation
     */
    select?: LotSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotSimulation
     */
    omit?: LotSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotSimulationInclude<ExtArgs> | null
    /**
     * The data needed to create a LotSimulation.
     */
    data: XOR<LotSimulationCreateInput, LotSimulationUncheckedCreateInput>
  }

  /**
   * LotSimulation createMany
   */
  export type LotSimulationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LotSimulations.
     */
    data: LotSimulationCreateManyInput | LotSimulationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LotSimulation update
   */
  export type LotSimulationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotSimulation
     */
    select?: LotSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotSimulation
     */
    omit?: LotSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotSimulationInclude<ExtArgs> | null
    /**
     * The data needed to update a LotSimulation.
     */
    data: XOR<LotSimulationUpdateInput, LotSimulationUncheckedUpdateInput>
    /**
     * Choose, which LotSimulation to update.
     */
    where: LotSimulationWhereUniqueInput
  }

  /**
   * LotSimulation updateMany
   */
  export type LotSimulationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LotSimulations.
     */
    data: XOR<LotSimulationUpdateManyMutationInput, LotSimulationUncheckedUpdateManyInput>
    /**
     * Filter which LotSimulations to update
     */
    where?: LotSimulationWhereInput
    /**
     * Limit how many LotSimulations to update.
     */
    limit?: number
  }

  /**
   * LotSimulation upsert
   */
  export type LotSimulationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotSimulation
     */
    select?: LotSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotSimulation
     */
    omit?: LotSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotSimulationInclude<ExtArgs> | null
    /**
     * The filter to search for the LotSimulation to update in case it exists.
     */
    where: LotSimulationWhereUniqueInput
    /**
     * In case the LotSimulation found by the `where` argument doesn't exist, create a new LotSimulation with this data.
     */
    create: XOR<LotSimulationCreateInput, LotSimulationUncheckedCreateInput>
    /**
     * In case the LotSimulation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LotSimulationUpdateInput, LotSimulationUncheckedUpdateInput>
  }

  /**
   * LotSimulation delete
   */
  export type LotSimulationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotSimulation
     */
    select?: LotSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotSimulation
     */
    omit?: LotSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotSimulationInclude<ExtArgs> | null
    /**
     * Filter which LotSimulation to delete.
     */
    where: LotSimulationWhereUniqueInput
  }

  /**
   * LotSimulation deleteMany
   */
  export type LotSimulationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LotSimulations to delete
     */
    where?: LotSimulationWhereInput
    /**
     * Limit how many LotSimulations to delete.
     */
    limit?: number
  }

  /**
   * LotSimulation without action
   */
  export type LotSimulationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LotSimulation
     */
    select?: LotSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LotSimulation
     */
    omit?: LotSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LotSimulationInclude<ExtArgs> | null
  }


  /**
   * Model Watchlist
   */

  export type AggregateWatchlist = {
    _count: WatchlistCountAggregateOutputType | null
    _min: WatchlistMinAggregateOutputType | null
    _max: WatchlistMaxAggregateOutputType | null
  }

  export type WatchlistMinAggregateOutputType = {
    id: string | null
    userEmail: string | null
    stockTicker: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type WatchlistMaxAggregateOutputType = {
    id: string | null
    userEmail: string | null
    stockTicker: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type WatchlistCountAggregateOutputType = {
    id: number
    userEmail: number
    stockTicker: number
    notes: number
    createdAt: number
    _all: number
  }


  export type WatchlistMinAggregateInputType = {
    id?: true
    userEmail?: true
    stockTicker?: true
    notes?: true
    createdAt?: true
  }

  export type WatchlistMaxAggregateInputType = {
    id?: true
    userEmail?: true
    stockTicker?: true
    notes?: true
    createdAt?: true
  }

  export type WatchlistCountAggregateInputType = {
    id?: true
    userEmail?: true
    stockTicker?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type WatchlistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Watchlist to aggregate.
     */
    where?: WatchlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watchlists to fetch.
     */
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WatchlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watchlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Watchlists
    **/
    _count?: true | WatchlistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WatchlistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WatchlistMaxAggregateInputType
  }

  export type GetWatchlistAggregateType<T extends WatchlistAggregateArgs> = {
        [P in keyof T & keyof AggregateWatchlist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatchlist[P]>
      : GetScalarType<T[P], AggregateWatchlist[P]>
  }




  export type WatchlistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistWhereInput
    orderBy?: WatchlistOrderByWithAggregationInput | WatchlistOrderByWithAggregationInput[]
    by: WatchlistScalarFieldEnum[] | WatchlistScalarFieldEnum
    having?: WatchlistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WatchlistCountAggregateInputType | true
    _min?: WatchlistMinAggregateInputType
    _max?: WatchlistMaxAggregateInputType
  }

  export type WatchlistGroupByOutputType = {
    id: string
    userEmail: string
    stockTicker: string
    notes: string | null
    createdAt: Date
    _count: WatchlistCountAggregateOutputType | null
    _min: WatchlistMinAggregateOutputType | null
    _max: WatchlistMaxAggregateOutputType | null
  }

  type GetWatchlistGroupByPayload<T extends WatchlistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WatchlistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WatchlistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatchlistGroupByOutputType[P]>
            : GetScalarType<T[P], WatchlistGroupByOutputType[P]>
        }
      >
    >


  export type WatchlistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    stockTicker?: boolean
    notes?: boolean
    createdAt?: boolean
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchlist"]>



  export type WatchlistSelectScalar = {
    id?: boolean
    userEmail?: boolean
    stockTicker?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type WatchlistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userEmail" | "stockTicker" | "notes" | "createdAt", ExtArgs["result"]["watchlist"]>
  export type WatchlistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }

  export type $WatchlistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Watchlist"
    objects: {
      stock: Prisma.$StockPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userEmail: string
      stockTicker: string
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["watchlist"]>
    composites: {}
  }

  type WatchlistGetPayload<S extends boolean | null | undefined | WatchlistDefaultArgs> = $Result.GetResult<Prisma.$WatchlistPayload, S>

  type WatchlistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WatchlistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WatchlistCountAggregateInputType | true
    }

  export interface WatchlistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Watchlist'], meta: { name: 'Watchlist' } }
    /**
     * Find zero or one Watchlist that matches the filter.
     * @param {WatchlistFindUniqueArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WatchlistFindUniqueArgs>(args: SelectSubset<T, WatchlistFindUniqueArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Watchlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WatchlistFindUniqueOrThrowArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WatchlistFindUniqueOrThrowArgs>(args: SelectSubset<T, WatchlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Watchlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistFindFirstArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WatchlistFindFirstArgs>(args?: SelectSubset<T, WatchlistFindFirstArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Watchlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistFindFirstOrThrowArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WatchlistFindFirstOrThrowArgs>(args?: SelectSubset<T, WatchlistFindFirstOrThrowArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Watchlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Watchlists
     * const watchlists = await prisma.watchlist.findMany()
     * 
     * // Get first 10 Watchlists
     * const watchlists = await prisma.watchlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const watchlistWithIdOnly = await prisma.watchlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WatchlistFindManyArgs>(args?: SelectSubset<T, WatchlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Watchlist.
     * @param {WatchlistCreateArgs} args - Arguments to create a Watchlist.
     * @example
     * // Create one Watchlist
     * const Watchlist = await prisma.watchlist.create({
     *   data: {
     *     // ... data to create a Watchlist
     *   }
     * })
     * 
     */
    create<T extends WatchlistCreateArgs>(args: SelectSubset<T, WatchlistCreateArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Watchlists.
     * @param {WatchlistCreateManyArgs} args - Arguments to create many Watchlists.
     * @example
     * // Create many Watchlists
     * const watchlist = await prisma.watchlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WatchlistCreateManyArgs>(args?: SelectSubset<T, WatchlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Watchlist.
     * @param {WatchlistDeleteArgs} args - Arguments to delete one Watchlist.
     * @example
     * // Delete one Watchlist
     * const Watchlist = await prisma.watchlist.delete({
     *   where: {
     *     // ... filter to delete one Watchlist
     *   }
     * })
     * 
     */
    delete<T extends WatchlistDeleteArgs>(args: SelectSubset<T, WatchlistDeleteArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Watchlist.
     * @param {WatchlistUpdateArgs} args - Arguments to update one Watchlist.
     * @example
     * // Update one Watchlist
     * const watchlist = await prisma.watchlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WatchlistUpdateArgs>(args: SelectSubset<T, WatchlistUpdateArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Watchlists.
     * @param {WatchlistDeleteManyArgs} args - Arguments to filter Watchlists to delete.
     * @example
     * // Delete a few Watchlists
     * const { count } = await prisma.watchlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WatchlistDeleteManyArgs>(args?: SelectSubset<T, WatchlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Watchlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Watchlists
     * const watchlist = await prisma.watchlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WatchlistUpdateManyArgs>(args: SelectSubset<T, WatchlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Watchlist.
     * @param {WatchlistUpsertArgs} args - Arguments to update or create a Watchlist.
     * @example
     * // Update or create a Watchlist
     * const watchlist = await prisma.watchlist.upsert({
     *   create: {
     *     // ... data to create a Watchlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Watchlist we want to update
     *   }
     * })
     */
    upsert<T extends WatchlistUpsertArgs>(args: SelectSubset<T, WatchlistUpsertArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Watchlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistCountArgs} args - Arguments to filter Watchlists to count.
     * @example
     * // Count the number of Watchlists
     * const count = await prisma.watchlist.count({
     *   where: {
     *     // ... the filter for the Watchlists we want to count
     *   }
     * })
    **/
    count<T extends WatchlistCountArgs>(
      args?: Subset<T, WatchlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatchlistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Watchlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WatchlistAggregateArgs>(args: Subset<T, WatchlistAggregateArgs>): Prisma.PrismaPromise<GetWatchlistAggregateType<T>>

    /**
     * Group by Watchlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WatchlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WatchlistGroupByArgs['orderBy'] }
        : { orderBy?: WatchlistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WatchlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWatchlistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Watchlist model
   */
  readonly fields: WatchlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Watchlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WatchlistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stock<T extends StockDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockDefaultArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Watchlist model
   */
  interface WatchlistFieldRefs {
    readonly id: FieldRef<"Watchlist", 'String'>
    readonly userEmail: FieldRef<"Watchlist", 'String'>
    readonly stockTicker: FieldRef<"Watchlist", 'String'>
    readonly notes: FieldRef<"Watchlist", 'String'>
    readonly createdAt: FieldRef<"Watchlist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Watchlist findUnique
   */
  export type WatchlistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlist to fetch.
     */
    where: WatchlistWhereUniqueInput
  }

  /**
   * Watchlist findUniqueOrThrow
   */
  export type WatchlistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlist to fetch.
     */
    where: WatchlistWhereUniqueInput
  }

  /**
   * Watchlist findFirst
   */
  export type WatchlistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlist to fetch.
     */
    where?: WatchlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watchlists to fetch.
     */
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Watchlists.
     */
    cursor?: WatchlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watchlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Watchlists.
     */
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * Watchlist findFirstOrThrow
   */
  export type WatchlistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlist to fetch.
     */
    where?: WatchlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watchlists to fetch.
     */
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Watchlists.
     */
    cursor?: WatchlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watchlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Watchlists.
     */
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * Watchlist findMany
   */
  export type WatchlistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlists to fetch.
     */
    where?: WatchlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watchlists to fetch.
     */
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Watchlists.
     */
    cursor?: WatchlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watchlists.
     */
    skip?: number
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * Watchlist create
   */
  export type WatchlistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * The data needed to create a Watchlist.
     */
    data: XOR<WatchlistCreateInput, WatchlistUncheckedCreateInput>
  }

  /**
   * Watchlist createMany
   */
  export type WatchlistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Watchlists.
     */
    data: WatchlistCreateManyInput | WatchlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Watchlist update
   */
  export type WatchlistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * The data needed to update a Watchlist.
     */
    data: XOR<WatchlistUpdateInput, WatchlistUncheckedUpdateInput>
    /**
     * Choose, which Watchlist to update.
     */
    where: WatchlistWhereUniqueInput
  }

  /**
   * Watchlist updateMany
   */
  export type WatchlistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Watchlists.
     */
    data: XOR<WatchlistUpdateManyMutationInput, WatchlistUncheckedUpdateManyInput>
    /**
     * Filter which Watchlists to update
     */
    where?: WatchlistWhereInput
    /**
     * Limit how many Watchlists to update.
     */
    limit?: number
  }

  /**
   * Watchlist upsert
   */
  export type WatchlistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * The filter to search for the Watchlist to update in case it exists.
     */
    where: WatchlistWhereUniqueInput
    /**
     * In case the Watchlist found by the `where` argument doesn't exist, create a new Watchlist with this data.
     */
    create: XOR<WatchlistCreateInput, WatchlistUncheckedCreateInput>
    /**
     * In case the Watchlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WatchlistUpdateInput, WatchlistUncheckedUpdateInput>
  }

  /**
   * Watchlist delete
   */
  export type WatchlistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter which Watchlist to delete.
     */
    where: WatchlistWhereUniqueInput
  }

  /**
   * Watchlist deleteMany
   */
  export type WatchlistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Watchlists to delete
     */
    where?: WatchlistWhereInput
    /**
     * Limit how many Watchlists to delete.
     */
    limit?: number
  }

  /**
   * Watchlist without action
   */
  export type WatchlistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    initialCapital: number | null
  }

  export type UserSumAggregateOutputType = {
    initialCapital: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    experienceLevel: string | null
    initialCapital: number | null
    initialCapitalLabel: string | null
    bio: string | null
    notificationsEnabled: boolean | null
    resetToken: string | null
    resetTokenExpires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    experienceLevel: string | null
    initialCapital: number | null
    initialCapitalLabel: string | null
    bio: string | null
    notificationsEnabled: boolean | null
    resetToken: string | null
    resetTokenExpires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    experienceLevel: number
    initialCapital: number
    initialCapitalLabel: number
    preferredSectors: number
    bio: number
    notificationsEnabled: number
    resetToken: number
    resetTokenExpires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    initialCapital?: true
  }

  export type UserSumAggregateInputType = {
    initialCapital?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    experienceLevel?: true
    initialCapital?: true
    initialCapitalLabel?: true
    bio?: true
    notificationsEnabled?: true
    resetToken?: true
    resetTokenExpires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    experienceLevel?: true
    initialCapital?: true
    initialCapitalLabel?: true
    bio?: true
    notificationsEnabled?: true
    resetToken?: true
    resetTokenExpires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    experienceLevel?: true
    initialCapital?: true
    initialCapitalLabel?: true
    preferredSectors?: true
    bio?: true
    notificationsEnabled?: true
    resetToken?: true
    resetTokenExpires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    experienceLevel: string
    initialCapital: number | null
    initialCapitalLabel: string | null
    preferredSectors: JsonValue | null
    bio: string | null
    notificationsEnabled: boolean
    resetToken: string | null
    resetTokenExpires: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    experienceLevel?: boolean
    initialCapital?: boolean
    initialCapitalLabel?: boolean
    preferredSectors?: boolean
    bio?: boolean
    notificationsEnabled?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    experienceLevel?: boolean
    initialCapital?: boolean
    initialCapitalLabel?: boolean
    preferredSectors?: boolean
    bio?: boolean
    notificationsEnabled?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "experienceLevel" | "initialCapital" | "initialCapitalLabel" | "preferredSectors" | "bio" | "notificationsEnabled" | "resetToken" | "resetTokenExpires" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      experienceLevel: string
      initialCapital: number | null
      initialCapitalLabel: string | null
      preferredSectors: Prisma.JsonValue | null
      bio: string | null
      notificationsEnabled: boolean
      resetToken: string | null
      resetTokenExpires: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly experienceLevel: FieldRef<"User", 'String'>
    readonly initialCapital: FieldRef<"User", 'Float'>
    readonly initialCapitalLabel: FieldRef<"User", 'String'>
    readonly preferredSectors: FieldRef<"User", 'Json'>
    readonly bio: FieldRef<"User", 'String'>
    readonly notificationsEnabled: FieldRef<"User", 'Boolean'>
    readonly resetToken: FieldRef<"User", 'String'>
    readonly resetTokenExpires: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StockScalarFieldEnum: {
    ticker: 'ticker',
    name: 'name',
    sector: 'sector',
    subSector: 'subSector',
    pricePerShare: 'pricePerShare',
    pricePerLot: 'pricePerLot',
    marketCap: 'marketCap',
    marketCapLabel: 'marketCapLabel',
    revenueGrowth: 'revenueGrowth',
    netIncomeGrowth: 'netIncomeGrowth',
    roe: 'roe',
    per: 'per',
    pbv: 'pbv',
    der: 'der',
    revenueLabel: 'revenueLabel',
    netIncomeLabel: 'netIncomeLabel',
    totalAssetsLabel: 'totalAssetsLabel',
    totalEquityLabel: 'totalEquityLabel',
    period: 'period',
    lastUpdated: 'lastUpdated',
    dataSource: 'dataSource',
    dataStatus: 'dataStatus',
    hasData: 'hasData',
    description: 'description',
    ipoYear: 'ipoYear',
    listingBoard: 'listingBoard',
    controllingShareholder: 'controllingShareholder',
    controllingPercentage: 'controllingPercentage',
    publicShareholder: 'publicShareholder',
    publicPercentage: 'publicPercentage',
    businessSegments: 'businessSegments',
    dividendYield: 'dividendYield',
    dividendPayoutRatio: 'dividendPayoutRatio',
    dividendDateNote: 'dividendDateNote',
    netProfitMargin: 'netProfitMargin',
    sectorSpecificMetric: 'sectorSpecificMetric',
    keyMoat: 'keyMoat',
    keyRisk: 'keyRisk',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StockScalarFieldEnum = (typeof StockScalarFieldEnum)[keyof typeof StockScalarFieldEnum]


  export const AiInsightScalarFieldEnum: {
    id: 'id',
    stockTicker: 'stockTicker',
    period: 'period',
    summary: 'summary',
    strengths: 'strengths',
    considerations: 'considerations',
    factPoints: 'factPoints',
    interpretationPoints: 'interpretationPoints',
    disclaimer: 'disclaimer',
    lastUpdated: 'lastUpdated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AiInsightScalarFieldEnum = (typeof AiInsightScalarFieldEnum)[keyof typeof AiInsightScalarFieldEnum]


  export const AiChatLogScalarFieldEnum: {
    id: 'id',
    userEmail: 'userEmail',
    stockTicker: 'stockTicker',
    sender: 'sender',
    message: 'message',
    period: 'period',
    createdAt: 'createdAt'
  };

  export type AiChatLogScalarFieldEnum = (typeof AiChatLogScalarFieldEnum)[keyof typeof AiChatLogScalarFieldEnum]


  export const LotSimulationScalarFieldEnum: {
    id: 'id',
    stockTicker: 'stockTicker',
    pricePerShare: 'pricePerShare',
    pricePerLot: 'pricePerLot',
    targetBudget: 'targetBudget',
    brokerFeePercent: 'brokerFeePercent',
    calculatedLots: 'calculatedLots',
    totalStockCost: 'totalStockCost',
    brokerFeeAmount: 'brokerFeeAmount',
    totalSpent: 'totalSpent',
    remainingCash: 'remainingCash',
    aiCommentary: 'aiCommentary',
    createdAt: 'createdAt'
  };

  export type LotSimulationScalarFieldEnum = (typeof LotSimulationScalarFieldEnum)[keyof typeof LotSimulationScalarFieldEnum]


  export const WatchlistScalarFieldEnum: {
    id: 'id',
    userEmail: 'userEmail',
    stockTicker: 'stockTicker',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type WatchlistScalarFieldEnum = (typeof WatchlistScalarFieldEnum)[keyof typeof WatchlistScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    experienceLevel: 'experienceLevel',
    initialCapital: 'initialCapital',
    initialCapitalLabel: 'initialCapitalLabel',
    preferredSectors: 'preferredSectors',
    bio: 'bio',
    notificationsEnabled: 'notificationsEnabled',
    resetToken: 'resetToken',
    resetTokenExpires: 'resetTokenExpires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const StockOrderByRelevanceFieldEnum: {
    ticker: 'ticker',
    name: 'name',
    sector: 'sector',
    subSector: 'subSector',
    marketCapLabel: 'marketCapLabel',
    revenueLabel: 'revenueLabel',
    netIncomeLabel: 'netIncomeLabel',
    totalAssetsLabel: 'totalAssetsLabel',
    totalEquityLabel: 'totalEquityLabel',
    period: 'period',
    lastUpdated: 'lastUpdated',
    dataSource: 'dataSource',
    dataStatus: 'dataStatus',
    description: 'description',
    listingBoard: 'listingBoard',
    controllingShareholder: 'controllingShareholder',
    publicShareholder: 'publicShareholder',
    dividendDateNote: 'dividendDateNote',
    keyMoat: 'keyMoat',
    keyRisk: 'keyRisk'
  };

  export type StockOrderByRelevanceFieldEnum = (typeof StockOrderByRelevanceFieldEnum)[keyof typeof StockOrderByRelevanceFieldEnum]


  export const AiInsightOrderByRelevanceFieldEnum: {
    id: 'id',
    stockTicker: 'stockTicker',
    period: 'period',
    summary: 'summary',
    disclaimer: 'disclaimer',
    lastUpdated: 'lastUpdated'
  };

  export type AiInsightOrderByRelevanceFieldEnum = (typeof AiInsightOrderByRelevanceFieldEnum)[keyof typeof AiInsightOrderByRelevanceFieldEnum]


  export const AiChatLogOrderByRelevanceFieldEnum: {
    id: 'id',
    userEmail: 'userEmail',
    stockTicker: 'stockTicker',
    sender: 'sender',
    message: 'message',
    period: 'period'
  };

  export type AiChatLogOrderByRelevanceFieldEnum = (typeof AiChatLogOrderByRelevanceFieldEnum)[keyof typeof AiChatLogOrderByRelevanceFieldEnum]


  export const LotSimulationOrderByRelevanceFieldEnum: {
    id: 'id',
    stockTicker: 'stockTicker',
    aiCommentary: 'aiCommentary'
  };

  export type LotSimulationOrderByRelevanceFieldEnum = (typeof LotSimulationOrderByRelevanceFieldEnum)[keyof typeof LotSimulationOrderByRelevanceFieldEnum]


  export const WatchlistOrderByRelevanceFieldEnum: {
    id: 'id',
    userEmail: 'userEmail',
    stockTicker: 'stockTicker',
    notes: 'notes'
  };

  export type WatchlistOrderByRelevanceFieldEnum = (typeof WatchlistOrderByRelevanceFieldEnum)[keyof typeof WatchlistOrderByRelevanceFieldEnum]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    experienceLevel: 'experienceLevel',
    initialCapitalLabel: 'initialCapitalLabel',
    bio: 'bio',
    resetToken: 'resetToken'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    
  /**
   * Deep Input Types
   */


  export type StockWhereInput = {
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    ticker?: StringFilter<"Stock"> | string
    name?: StringFilter<"Stock"> | string
    sector?: StringFilter<"Stock"> | string
    subSector?: StringFilter<"Stock"> | string
    pricePerShare?: FloatFilter<"Stock"> | number
    pricePerLot?: FloatFilter<"Stock"> | number
    marketCap?: FloatFilter<"Stock"> | number
    marketCapLabel?: StringFilter<"Stock"> | string
    revenueGrowth?: FloatFilter<"Stock"> | number
    netIncomeGrowth?: FloatFilter<"Stock"> | number
    roe?: FloatFilter<"Stock"> | number
    per?: FloatFilter<"Stock"> | number
    pbv?: FloatNullableFilter<"Stock"> | number | null
    der?: FloatNullableFilter<"Stock"> | number | null
    revenueLabel?: StringNullableFilter<"Stock"> | string | null
    netIncomeLabel?: StringNullableFilter<"Stock"> | string | null
    totalAssetsLabel?: StringNullableFilter<"Stock"> | string | null
    totalEquityLabel?: StringNullableFilter<"Stock"> | string | null
    period?: StringFilter<"Stock"> | string
    lastUpdated?: StringNullableFilter<"Stock"> | string | null
    dataSource?: StringNullableFilter<"Stock"> | string | null
    dataStatus?: StringNullableFilter<"Stock"> | string | null
    hasData?: BoolFilter<"Stock"> | boolean
    description?: StringNullableFilter<"Stock"> | string | null
    ipoYear?: IntNullableFilter<"Stock"> | number | null
    listingBoard?: StringNullableFilter<"Stock"> | string | null
    controllingShareholder?: StringNullableFilter<"Stock"> | string | null
    controllingPercentage?: FloatNullableFilter<"Stock"> | number | null
    publicShareholder?: StringNullableFilter<"Stock"> | string | null
    publicPercentage?: FloatNullableFilter<"Stock"> | number | null
    businessSegments?: JsonNullableFilter<"Stock">
    dividendYield?: FloatNullableFilter<"Stock"> | number | null
    dividendPayoutRatio?: FloatNullableFilter<"Stock"> | number | null
    dividendDateNote?: StringNullableFilter<"Stock"> | string | null
    netProfitMargin?: FloatNullableFilter<"Stock"> | number | null
    sectorSpecificMetric?: JsonNullableFilter<"Stock">
    keyMoat?: StringNullableFilter<"Stock"> | string | null
    keyRisk?: StringNullableFilter<"Stock"> | string | null
    createdAt?: DateTimeFilter<"Stock"> | Date | string
    updatedAt?: DateTimeFilter<"Stock"> | Date | string
    aiInsights?: AiInsightListRelationFilter
    aiChatLogs?: AiChatLogListRelationFilter
    lotSimulations?: LotSimulationListRelationFilter
    watchlists?: WatchlistListRelationFilter
  }

  export type StockOrderByWithRelationInput = {
    ticker?: SortOrder
    name?: SortOrder
    sector?: SortOrder
    subSector?: SortOrder
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    marketCap?: SortOrder
    marketCapLabel?: SortOrder
    revenueGrowth?: SortOrder
    netIncomeGrowth?: SortOrder
    roe?: SortOrder
    per?: SortOrder
    pbv?: SortOrderInput | SortOrder
    der?: SortOrderInput | SortOrder
    revenueLabel?: SortOrderInput | SortOrder
    netIncomeLabel?: SortOrderInput | SortOrder
    totalAssetsLabel?: SortOrderInput | SortOrder
    totalEquityLabel?: SortOrderInput | SortOrder
    period?: SortOrder
    lastUpdated?: SortOrderInput | SortOrder
    dataSource?: SortOrderInput | SortOrder
    dataStatus?: SortOrderInput | SortOrder
    hasData?: SortOrder
    description?: SortOrderInput | SortOrder
    ipoYear?: SortOrderInput | SortOrder
    listingBoard?: SortOrderInput | SortOrder
    controllingShareholder?: SortOrderInput | SortOrder
    controllingPercentage?: SortOrderInput | SortOrder
    publicShareholder?: SortOrderInput | SortOrder
    publicPercentage?: SortOrderInput | SortOrder
    businessSegments?: SortOrderInput | SortOrder
    dividendYield?: SortOrderInput | SortOrder
    dividendPayoutRatio?: SortOrderInput | SortOrder
    dividendDateNote?: SortOrderInput | SortOrder
    netProfitMargin?: SortOrderInput | SortOrder
    sectorSpecificMetric?: SortOrderInput | SortOrder
    keyMoat?: SortOrderInput | SortOrder
    keyRisk?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    aiInsights?: AiInsightOrderByRelationAggregateInput
    aiChatLogs?: AiChatLogOrderByRelationAggregateInput
    lotSimulations?: LotSimulationOrderByRelationAggregateInput
    watchlists?: WatchlistOrderByRelationAggregateInput
    _relevance?: StockOrderByRelevanceInput
  }

  export type StockWhereUniqueInput = Prisma.AtLeast<{
    ticker?: string
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    name?: StringFilter<"Stock"> | string
    sector?: StringFilter<"Stock"> | string
    subSector?: StringFilter<"Stock"> | string
    pricePerShare?: FloatFilter<"Stock"> | number
    pricePerLot?: FloatFilter<"Stock"> | number
    marketCap?: FloatFilter<"Stock"> | number
    marketCapLabel?: StringFilter<"Stock"> | string
    revenueGrowth?: FloatFilter<"Stock"> | number
    netIncomeGrowth?: FloatFilter<"Stock"> | number
    roe?: FloatFilter<"Stock"> | number
    per?: FloatFilter<"Stock"> | number
    pbv?: FloatNullableFilter<"Stock"> | number | null
    der?: FloatNullableFilter<"Stock"> | number | null
    revenueLabel?: StringNullableFilter<"Stock"> | string | null
    netIncomeLabel?: StringNullableFilter<"Stock"> | string | null
    totalAssetsLabel?: StringNullableFilter<"Stock"> | string | null
    totalEquityLabel?: StringNullableFilter<"Stock"> | string | null
    period?: StringFilter<"Stock"> | string
    lastUpdated?: StringNullableFilter<"Stock"> | string | null
    dataSource?: StringNullableFilter<"Stock"> | string | null
    dataStatus?: StringNullableFilter<"Stock"> | string | null
    hasData?: BoolFilter<"Stock"> | boolean
    description?: StringNullableFilter<"Stock"> | string | null
    ipoYear?: IntNullableFilter<"Stock"> | number | null
    listingBoard?: StringNullableFilter<"Stock"> | string | null
    controllingShareholder?: StringNullableFilter<"Stock"> | string | null
    controllingPercentage?: FloatNullableFilter<"Stock"> | number | null
    publicShareholder?: StringNullableFilter<"Stock"> | string | null
    publicPercentage?: FloatNullableFilter<"Stock"> | number | null
    businessSegments?: JsonNullableFilter<"Stock">
    dividendYield?: FloatNullableFilter<"Stock"> | number | null
    dividendPayoutRatio?: FloatNullableFilter<"Stock"> | number | null
    dividendDateNote?: StringNullableFilter<"Stock"> | string | null
    netProfitMargin?: FloatNullableFilter<"Stock"> | number | null
    sectorSpecificMetric?: JsonNullableFilter<"Stock">
    keyMoat?: StringNullableFilter<"Stock"> | string | null
    keyRisk?: StringNullableFilter<"Stock"> | string | null
    createdAt?: DateTimeFilter<"Stock"> | Date | string
    updatedAt?: DateTimeFilter<"Stock"> | Date | string
    aiInsights?: AiInsightListRelationFilter
    aiChatLogs?: AiChatLogListRelationFilter
    lotSimulations?: LotSimulationListRelationFilter
    watchlists?: WatchlistListRelationFilter
  }, "ticker">

  export type StockOrderByWithAggregationInput = {
    ticker?: SortOrder
    name?: SortOrder
    sector?: SortOrder
    subSector?: SortOrder
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    marketCap?: SortOrder
    marketCapLabel?: SortOrder
    revenueGrowth?: SortOrder
    netIncomeGrowth?: SortOrder
    roe?: SortOrder
    per?: SortOrder
    pbv?: SortOrderInput | SortOrder
    der?: SortOrderInput | SortOrder
    revenueLabel?: SortOrderInput | SortOrder
    netIncomeLabel?: SortOrderInput | SortOrder
    totalAssetsLabel?: SortOrderInput | SortOrder
    totalEquityLabel?: SortOrderInput | SortOrder
    period?: SortOrder
    lastUpdated?: SortOrderInput | SortOrder
    dataSource?: SortOrderInput | SortOrder
    dataStatus?: SortOrderInput | SortOrder
    hasData?: SortOrder
    description?: SortOrderInput | SortOrder
    ipoYear?: SortOrderInput | SortOrder
    listingBoard?: SortOrderInput | SortOrder
    controllingShareholder?: SortOrderInput | SortOrder
    controllingPercentage?: SortOrderInput | SortOrder
    publicShareholder?: SortOrderInput | SortOrder
    publicPercentage?: SortOrderInput | SortOrder
    businessSegments?: SortOrderInput | SortOrder
    dividendYield?: SortOrderInput | SortOrder
    dividendPayoutRatio?: SortOrderInput | SortOrder
    dividendDateNote?: SortOrderInput | SortOrder
    netProfitMargin?: SortOrderInput | SortOrder
    sectorSpecificMetric?: SortOrderInput | SortOrder
    keyMoat?: SortOrderInput | SortOrder
    keyRisk?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StockCountOrderByAggregateInput
    _avg?: StockAvgOrderByAggregateInput
    _max?: StockMaxOrderByAggregateInput
    _min?: StockMinOrderByAggregateInput
    _sum?: StockSumOrderByAggregateInput
  }

  export type StockScalarWhereWithAggregatesInput = {
    AND?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    OR?: StockScalarWhereWithAggregatesInput[]
    NOT?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    ticker?: StringWithAggregatesFilter<"Stock"> | string
    name?: StringWithAggregatesFilter<"Stock"> | string
    sector?: StringWithAggregatesFilter<"Stock"> | string
    subSector?: StringWithAggregatesFilter<"Stock"> | string
    pricePerShare?: FloatWithAggregatesFilter<"Stock"> | number
    pricePerLot?: FloatWithAggregatesFilter<"Stock"> | number
    marketCap?: FloatWithAggregatesFilter<"Stock"> | number
    marketCapLabel?: StringWithAggregatesFilter<"Stock"> | string
    revenueGrowth?: FloatWithAggregatesFilter<"Stock"> | number
    netIncomeGrowth?: FloatWithAggregatesFilter<"Stock"> | number
    roe?: FloatWithAggregatesFilter<"Stock"> | number
    per?: FloatWithAggregatesFilter<"Stock"> | number
    pbv?: FloatNullableWithAggregatesFilter<"Stock"> | number | null
    der?: FloatNullableWithAggregatesFilter<"Stock"> | number | null
    revenueLabel?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    netIncomeLabel?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    totalAssetsLabel?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    totalEquityLabel?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    period?: StringWithAggregatesFilter<"Stock"> | string
    lastUpdated?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    dataSource?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    dataStatus?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    hasData?: BoolWithAggregatesFilter<"Stock"> | boolean
    description?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    ipoYear?: IntNullableWithAggregatesFilter<"Stock"> | number | null
    listingBoard?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    controllingShareholder?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    controllingPercentage?: FloatNullableWithAggregatesFilter<"Stock"> | number | null
    publicShareholder?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    publicPercentage?: FloatNullableWithAggregatesFilter<"Stock"> | number | null
    businessSegments?: JsonNullableWithAggregatesFilter<"Stock">
    dividendYield?: FloatNullableWithAggregatesFilter<"Stock"> | number | null
    dividendPayoutRatio?: FloatNullableWithAggregatesFilter<"Stock"> | number | null
    dividendDateNote?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    netProfitMargin?: FloatNullableWithAggregatesFilter<"Stock"> | number | null
    sectorSpecificMetric?: JsonNullableWithAggregatesFilter<"Stock">
    keyMoat?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    keyRisk?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Stock"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Stock"> | Date | string
  }

  export type AiInsightWhereInput = {
    AND?: AiInsightWhereInput | AiInsightWhereInput[]
    OR?: AiInsightWhereInput[]
    NOT?: AiInsightWhereInput | AiInsightWhereInput[]
    id?: StringFilter<"AiInsight"> | string
    stockTicker?: StringFilter<"AiInsight"> | string
    period?: StringFilter<"AiInsight"> | string
    summary?: StringFilter<"AiInsight"> | string
    strengths?: JsonFilter<"AiInsight">
    considerations?: JsonFilter<"AiInsight">
    factPoints?: JsonNullableFilter<"AiInsight">
    interpretationPoints?: JsonNullableFilter<"AiInsight">
    disclaimer?: StringNullableFilter<"AiInsight"> | string | null
    lastUpdated?: StringNullableFilter<"AiInsight"> | string | null
    createdAt?: DateTimeFilter<"AiInsight"> | Date | string
    updatedAt?: DateTimeFilter<"AiInsight"> | Date | string
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }

  export type AiInsightOrderByWithRelationInput = {
    id?: SortOrder
    stockTicker?: SortOrder
    period?: SortOrder
    summary?: SortOrder
    strengths?: SortOrder
    considerations?: SortOrder
    factPoints?: SortOrderInput | SortOrder
    interpretationPoints?: SortOrderInput | SortOrder
    disclaimer?: SortOrderInput | SortOrder
    lastUpdated?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stock?: StockOrderByWithRelationInput
    _relevance?: AiInsightOrderByRelevanceInput
  }

  export type AiInsightWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiInsightWhereInput | AiInsightWhereInput[]
    OR?: AiInsightWhereInput[]
    NOT?: AiInsightWhereInput | AiInsightWhereInput[]
    stockTicker?: StringFilter<"AiInsight"> | string
    period?: StringFilter<"AiInsight"> | string
    summary?: StringFilter<"AiInsight"> | string
    strengths?: JsonFilter<"AiInsight">
    considerations?: JsonFilter<"AiInsight">
    factPoints?: JsonNullableFilter<"AiInsight">
    interpretationPoints?: JsonNullableFilter<"AiInsight">
    disclaimer?: StringNullableFilter<"AiInsight"> | string | null
    lastUpdated?: StringNullableFilter<"AiInsight"> | string | null
    createdAt?: DateTimeFilter<"AiInsight"> | Date | string
    updatedAt?: DateTimeFilter<"AiInsight"> | Date | string
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }, "id">

  export type AiInsightOrderByWithAggregationInput = {
    id?: SortOrder
    stockTicker?: SortOrder
    period?: SortOrder
    summary?: SortOrder
    strengths?: SortOrder
    considerations?: SortOrder
    factPoints?: SortOrderInput | SortOrder
    interpretationPoints?: SortOrderInput | SortOrder
    disclaimer?: SortOrderInput | SortOrder
    lastUpdated?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AiInsightCountOrderByAggregateInput
    _max?: AiInsightMaxOrderByAggregateInput
    _min?: AiInsightMinOrderByAggregateInput
  }

  export type AiInsightScalarWhereWithAggregatesInput = {
    AND?: AiInsightScalarWhereWithAggregatesInput | AiInsightScalarWhereWithAggregatesInput[]
    OR?: AiInsightScalarWhereWithAggregatesInput[]
    NOT?: AiInsightScalarWhereWithAggregatesInput | AiInsightScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiInsight"> | string
    stockTicker?: StringWithAggregatesFilter<"AiInsight"> | string
    period?: StringWithAggregatesFilter<"AiInsight"> | string
    summary?: StringWithAggregatesFilter<"AiInsight"> | string
    strengths?: JsonWithAggregatesFilter<"AiInsight">
    considerations?: JsonWithAggregatesFilter<"AiInsight">
    factPoints?: JsonNullableWithAggregatesFilter<"AiInsight">
    interpretationPoints?: JsonNullableWithAggregatesFilter<"AiInsight">
    disclaimer?: StringNullableWithAggregatesFilter<"AiInsight"> | string | null
    lastUpdated?: StringNullableWithAggregatesFilter<"AiInsight"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AiInsight"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AiInsight"> | Date | string
  }

  export type AiChatLogWhereInput = {
    AND?: AiChatLogWhereInput | AiChatLogWhereInput[]
    OR?: AiChatLogWhereInput[]
    NOT?: AiChatLogWhereInput | AiChatLogWhereInput[]
    id?: StringFilter<"AiChatLog"> | string
    userEmail?: StringFilter<"AiChatLog"> | string
    stockTicker?: StringFilter<"AiChatLog"> | string
    sender?: StringFilter<"AiChatLog"> | string
    message?: StringFilter<"AiChatLog"> | string
    period?: StringNullableFilter<"AiChatLog"> | string | null
    createdAt?: DateTimeFilter<"AiChatLog"> | Date | string
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }

  export type AiChatLogOrderByWithRelationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    stockTicker?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    period?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    stock?: StockOrderByWithRelationInput
    _relevance?: AiChatLogOrderByRelevanceInput
  }

  export type AiChatLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiChatLogWhereInput | AiChatLogWhereInput[]
    OR?: AiChatLogWhereInput[]
    NOT?: AiChatLogWhereInput | AiChatLogWhereInput[]
    userEmail?: StringFilter<"AiChatLog"> | string
    stockTicker?: StringFilter<"AiChatLog"> | string
    sender?: StringFilter<"AiChatLog"> | string
    message?: StringFilter<"AiChatLog"> | string
    period?: StringNullableFilter<"AiChatLog"> | string | null
    createdAt?: DateTimeFilter<"AiChatLog"> | Date | string
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }, "id">

  export type AiChatLogOrderByWithAggregationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    stockTicker?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    period?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AiChatLogCountOrderByAggregateInput
    _max?: AiChatLogMaxOrderByAggregateInput
    _min?: AiChatLogMinOrderByAggregateInput
  }

  export type AiChatLogScalarWhereWithAggregatesInput = {
    AND?: AiChatLogScalarWhereWithAggregatesInput | AiChatLogScalarWhereWithAggregatesInput[]
    OR?: AiChatLogScalarWhereWithAggregatesInput[]
    NOT?: AiChatLogScalarWhereWithAggregatesInput | AiChatLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiChatLog"> | string
    userEmail?: StringWithAggregatesFilter<"AiChatLog"> | string
    stockTicker?: StringWithAggregatesFilter<"AiChatLog"> | string
    sender?: StringWithAggregatesFilter<"AiChatLog"> | string
    message?: StringWithAggregatesFilter<"AiChatLog"> | string
    period?: StringNullableWithAggregatesFilter<"AiChatLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AiChatLog"> | Date | string
  }

  export type LotSimulationWhereInput = {
    AND?: LotSimulationWhereInput | LotSimulationWhereInput[]
    OR?: LotSimulationWhereInput[]
    NOT?: LotSimulationWhereInput | LotSimulationWhereInput[]
    id?: StringFilter<"LotSimulation"> | string
    stockTicker?: StringFilter<"LotSimulation"> | string
    pricePerShare?: FloatFilter<"LotSimulation"> | number
    pricePerLot?: FloatFilter<"LotSimulation"> | number
    targetBudget?: FloatFilter<"LotSimulation"> | number
    brokerFeePercent?: FloatFilter<"LotSimulation"> | number
    calculatedLots?: IntFilter<"LotSimulation"> | number
    totalStockCost?: FloatFilter<"LotSimulation"> | number
    brokerFeeAmount?: FloatFilter<"LotSimulation"> | number
    totalSpent?: FloatFilter<"LotSimulation"> | number
    remainingCash?: FloatFilter<"LotSimulation"> | number
    aiCommentary?: StringNullableFilter<"LotSimulation"> | string | null
    createdAt?: DateTimeFilter<"LotSimulation"> | Date | string
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }

  export type LotSimulationOrderByWithRelationInput = {
    id?: SortOrder
    stockTicker?: SortOrder
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    targetBudget?: SortOrder
    brokerFeePercent?: SortOrder
    calculatedLots?: SortOrder
    totalStockCost?: SortOrder
    brokerFeeAmount?: SortOrder
    totalSpent?: SortOrder
    remainingCash?: SortOrder
    aiCommentary?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    stock?: StockOrderByWithRelationInput
    _relevance?: LotSimulationOrderByRelevanceInput
  }

  export type LotSimulationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LotSimulationWhereInput | LotSimulationWhereInput[]
    OR?: LotSimulationWhereInput[]
    NOT?: LotSimulationWhereInput | LotSimulationWhereInput[]
    stockTicker?: StringFilter<"LotSimulation"> | string
    pricePerShare?: FloatFilter<"LotSimulation"> | number
    pricePerLot?: FloatFilter<"LotSimulation"> | number
    targetBudget?: FloatFilter<"LotSimulation"> | number
    brokerFeePercent?: FloatFilter<"LotSimulation"> | number
    calculatedLots?: IntFilter<"LotSimulation"> | number
    totalStockCost?: FloatFilter<"LotSimulation"> | number
    brokerFeeAmount?: FloatFilter<"LotSimulation"> | number
    totalSpent?: FloatFilter<"LotSimulation"> | number
    remainingCash?: FloatFilter<"LotSimulation"> | number
    aiCommentary?: StringNullableFilter<"LotSimulation"> | string | null
    createdAt?: DateTimeFilter<"LotSimulation"> | Date | string
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }, "id">

  export type LotSimulationOrderByWithAggregationInput = {
    id?: SortOrder
    stockTicker?: SortOrder
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    targetBudget?: SortOrder
    brokerFeePercent?: SortOrder
    calculatedLots?: SortOrder
    totalStockCost?: SortOrder
    brokerFeeAmount?: SortOrder
    totalSpent?: SortOrder
    remainingCash?: SortOrder
    aiCommentary?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LotSimulationCountOrderByAggregateInput
    _avg?: LotSimulationAvgOrderByAggregateInput
    _max?: LotSimulationMaxOrderByAggregateInput
    _min?: LotSimulationMinOrderByAggregateInput
    _sum?: LotSimulationSumOrderByAggregateInput
  }

  export type LotSimulationScalarWhereWithAggregatesInput = {
    AND?: LotSimulationScalarWhereWithAggregatesInput | LotSimulationScalarWhereWithAggregatesInput[]
    OR?: LotSimulationScalarWhereWithAggregatesInput[]
    NOT?: LotSimulationScalarWhereWithAggregatesInput | LotSimulationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LotSimulation"> | string
    stockTicker?: StringWithAggregatesFilter<"LotSimulation"> | string
    pricePerShare?: FloatWithAggregatesFilter<"LotSimulation"> | number
    pricePerLot?: FloatWithAggregatesFilter<"LotSimulation"> | number
    targetBudget?: FloatWithAggregatesFilter<"LotSimulation"> | number
    brokerFeePercent?: FloatWithAggregatesFilter<"LotSimulation"> | number
    calculatedLots?: IntWithAggregatesFilter<"LotSimulation"> | number
    totalStockCost?: FloatWithAggregatesFilter<"LotSimulation"> | number
    brokerFeeAmount?: FloatWithAggregatesFilter<"LotSimulation"> | number
    totalSpent?: FloatWithAggregatesFilter<"LotSimulation"> | number
    remainingCash?: FloatWithAggregatesFilter<"LotSimulation"> | number
    aiCommentary?: StringNullableWithAggregatesFilter<"LotSimulation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LotSimulation"> | Date | string
  }

  export type WatchlistWhereInput = {
    AND?: WatchlistWhereInput | WatchlistWhereInput[]
    OR?: WatchlistWhereInput[]
    NOT?: WatchlistWhereInput | WatchlistWhereInput[]
    id?: StringFilter<"Watchlist"> | string
    userEmail?: StringFilter<"Watchlist"> | string
    stockTicker?: StringFilter<"Watchlist"> | string
    notes?: StringNullableFilter<"Watchlist"> | string | null
    createdAt?: DateTimeFilter<"Watchlist"> | Date | string
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }

  export type WatchlistOrderByWithRelationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    stockTicker?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    stock?: StockOrderByWithRelationInput
    _relevance?: WatchlistOrderByRelevanceInput
  }

  export type WatchlistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userEmail_stockTicker?: WatchlistUserEmailStockTickerCompoundUniqueInput
    AND?: WatchlistWhereInput | WatchlistWhereInput[]
    OR?: WatchlistWhereInput[]
    NOT?: WatchlistWhereInput | WatchlistWhereInput[]
    userEmail?: StringFilter<"Watchlist"> | string
    stockTicker?: StringFilter<"Watchlist"> | string
    notes?: StringNullableFilter<"Watchlist"> | string | null
    createdAt?: DateTimeFilter<"Watchlist"> | Date | string
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }, "id" | "userEmail_stockTicker">

  export type WatchlistOrderByWithAggregationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    stockTicker?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WatchlistCountOrderByAggregateInput
    _max?: WatchlistMaxOrderByAggregateInput
    _min?: WatchlistMinOrderByAggregateInput
  }

  export type WatchlistScalarWhereWithAggregatesInput = {
    AND?: WatchlistScalarWhereWithAggregatesInput | WatchlistScalarWhereWithAggregatesInput[]
    OR?: WatchlistScalarWhereWithAggregatesInput[]
    NOT?: WatchlistScalarWhereWithAggregatesInput | WatchlistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Watchlist"> | string
    userEmail?: StringWithAggregatesFilter<"Watchlist"> | string
    stockTicker?: StringWithAggregatesFilter<"Watchlist"> | string
    notes?: StringNullableWithAggregatesFilter<"Watchlist"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Watchlist"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    experienceLevel?: StringFilter<"User"> | string
    initialCapital?: FloatNullableFilter<"User"> | number | null
    initialCapitalLabel?: StringNullableFilter<"User"> | string | null
    preferredSectors?: JsonNullableFilter<"User">
    bio?: StringNullableFilter<"User"> | string | null
    notificationsEnabled?: BoolFilter<"User"> | boolean
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    experienceLevel?: SortOrder
    initialCapital?: SortOrderInput | SortOrder
    initialCapitalLabel?: SortOrderInput | SortOrder
    preferredSectors?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    notificationsEnabled?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpires?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    experienceLevel?: StringFilter<"User"> | string
    initialCapital?: FloatNullableFilter<"User"> | number | null
    initialCapitalLabel?: StringNullableFilter<"User"> | string | null
    preferredSectors?: JsonNullableFilter<"User">
    bio?: StringNullableFilter<"User"> | string | null
    notificationsEnabled?: BoolFilter<"User"> | boolean
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    experienceLevel?: SortOrder
    initialCapital?: SortOrderInput | SortOrder
    initialCapitalLabel?: SortOrderInput | SortOrder
    preferredSectors?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    notificationsEnabled?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpires?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    experienceLevel?: StringWithAggregatesFilter<"User"> | string
    initialCapital?: FloatNullableWithAggregatesFilter<"User"> | number | null
    initialCapitalLabel?: StringNullableWithAggregatesFilter<"User"> | string | null
    preferredSectors?: JsonNullableWithAggregatesFilter<"User">
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    notificationsEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    resetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetTokenExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StockCreateInput = {
    ticker: string
    name: string
    sector: string
    subSector: string
    pricePerShare?: number
    pricePerLot?: number
    marketCap: number
    marketCapLabel: string
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv?: number | null
    der?: number | null
    revenueLabel?: string | null
    netIncomeLabel?: string | null
    totalAssetsLabel?: string | null
    totalEquityLabel?: string | null
    period?: string
    lastUpdated?: string | null
    dataSource?: string | null
    dataStatus?: string | null
    hasData?: boolean
    description?: string | null
    ipoYear?: number | null
    listingBoard?: string | null
    controllingShareholder?: string | null
    controllingPercentage?: number | null
    publicShareholder?: string | null
    publicPercentage?: number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: number | null
    dividendPayoutRatio?: number | null
    dividendDateNote?: string | null
    netProfitMargin?: number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: string | null
    keyRisk?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aiInsights?: AiInsightCreateNestedManyWithoutStockInput
    aiChatLogs?: AiChatLogCreateNestedManyWithoutStockInput
    lotSimulations?: LotSimulationCreateNestedManyWithoutStockInput
    watchlists?: WatchlistCreateNestedManyWithoutStockInput
  }

  export type StockUncheckedCreateInput = {
    ticker: string
    name: string
    sector: string
    subSector: string
    pricePerShare?: number
    pricePerLot?: number
    marketCap: number
    marketCapLabel: string
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv?: number | null
    der?: number | null
    revenueLabel?: string | null
    netIncomeLabel?: string | null
    totalAssetsLabel?: string | null
    totalEquityLabel?: string | null
    period?: string
    lastUpdated?: string | null
    dataSource?: string | null
    dataStatus?: string | null
    hasData?: boolean
    description?: string | null
    ipoYear?: number | null
    listingBoard?: string | null
    controllingShareholder?: string | null
    controllingPercentage?: number | null
    publicShareholder?: string | null
    publicPercentage?: number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: number | null
    dividendPayoutRatio?: number | null
    dividendDateNote?: string | null
    netProfitMargin?: number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: string | null
    keyRisk?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aiInsights?: AiInsightUncheckedCreateNestedManyWithoutStockInput
    aiChatLogs?: AiChatLogUncheckedCreateNestedManyWithoutStockInput
    lotSimulations?: LotSimulationUncheckedCreateNestedManyWithoutStockInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutStockInput
  }

  export type StockUpdateInput = {
    ticker?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    subSector?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    marketCapLabel?: StringFieldUpdateOperationsInput | string
    revenueGrowth?: FloatFieldUpdateOperationsInput | number
    netIncomeGrowth?: FloatFieldUpdateOperationsInput | number
    roe?: FloatFieldUpdateOperationsInput | number
    per?: FloatFieldUpdateOperationsInput | number
    pbv?: NullableFloatFieldUpdateOperationsInput | number | null
    der?: NullableFloatFieldUpdateOperationsInput | number | null
    revenueLabel?: NullableStringFieldUpdateOperationsInput | string | null
    netIncomeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalAssetsLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEquityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    period?: StringFieldUpdateOperationsInput | string
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: NullableStringFieldUpdateOperationsInput | string | null
    dataStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasData?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ipoYear?: NullableIntFieldUpdateOperationsInput | number | null
    listingBoard?: NullableStringFieldUpdateOperationsInput | string | null
    controllingShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    controllingPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    publicShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    publicPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendPayoutRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendDateNote?: NullableStringFieldUpdateOperationsInput | string | null
    netProfitMargin?: NullableFloatFieldUpdateOperationsInput | number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: NullableStringFieldUpdateOperationsInput | string | null
    keyRisk?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiInsights?: AiInsightUpdateManyWithoutStockNestedInput
    aiChatLogs?: AiChatLogUpdateManyWithoutStockNestedInput
    lotSimulations?: LotSimulationUpdateManyWithoutStockNestedInput
    watchlists?: WatchlistUpdateManyWithoutStockNestedInput
  }

  export type StockUncheckedUpdateInput = {
    ticker?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    subSector?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    marketCapLabel?: StringFieldUpdateOperationsInput | string
    revenueGrowth?: FloatFieldUpdateOperationsInput | number
    netIncomeGrowth?: FloatFieldUpdateOperationsInput | number
    roe?: FloatFieldUpdateOperationsInput | number
    per?: FloatFieldUpdateOperationsInput | number
    pbv?: NullableFloatFieldUpdateOperationsInput | number | null
    der?: NullableFloatFieldUpdateOperationsInput | number | null
    revenueLabel?: NullableStringFieldUpdateOperationsInput | string | null
    netIncomeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalAssetsLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEquityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    period?: StringFieldUpdateOperationsInput | string
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: NullableStringFieldUpdateOperationsInput | string | null
    dataStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasData?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ipoYear?: NullableIntFieldUpdateOperationsInput | number | null
    listingBoard?: NullableStringFieldUpdateOperationsInput | string | null
    controllingShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    controllingPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    publicShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    publicPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendPayoutRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendDateNote?: NullableStringFieldUpdateOperationsInput | string | null
    netProfitMargin?: NullableFloatFieldUpdateOperationsInput | number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: NullableStringFieldUpdateOperationsInput | string | null
    keyRisk?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiInsights?: AiInsightUncheckedUpdateManyWithoutStockNestedInput
    aiChatLogs?: AiChatLogUncheckedUpdateManyWithoutStockNestedInput
    lotSimulations?: LotSimulationUncheckedUpdateManyWithoutStockNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutStockNestedInput
  }

  export type StockCreateManyInput = {
    ticker: string
    name: string
    sector: string
    subSector: string
    pricePerShare?: number
    pricePerLot?: number
    marketCap: number
    marketCapLabel: string
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv?: number | null
    der?: number | null
    revenueLabel?: string | null
    netIncomeLabel?: string | null
    totalAssetsLabel?: string | null
    totalEquityLabel?: string | null
    period?: string
    lastUpdated?: string | null
    dataSource?: string | null
    dataStatus?: string | null
    hasData?: boolean
    description?: string | null
    ipoYear?: number | null
    listingBoard?: string | null
    controllingShareholder?: string | null
    controllingPercentage?: number | null
    publicShareholder?: string | null
    publicPercentage?: number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: number | null
    dividendPayoutRatio?: number | null
    dividendDateNote?: string | null
    netProfitMargin?: number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: string | null
    keyRisk?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockUpdateManyMutationInput = {
    ticker?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    subSector?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    marketCapLabel?: StringFieldUpdateOperationsInput | string
    revenueGrowth?: FloatFieldUpdateOperationsInput | number
    netIncomeGrowth?: FloatFieldUpdateOperationsInput | number
    roe?: FloatFieldUpdateOperationsInput | number
    per?: FloatFieldUpdateOperationsInput | number
    pbv?: NullableFloatFieldUpdateOperationsInput | number | null
    der?: NullableFloatFieldUpdateOperationsInput | number | null
    revenueLabel?: NullableStringFieldUpdateOperationsInput | string | null
    netIncomeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalAssetsLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEquityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    period?: StringFieldUpdateOperationsInput | string
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: NullableStringFieldUpdateOperationsInput | string | null
    dataStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasData?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ipoYear?: NullableIntFieldUpdateOperationsInput | number | null
    listingBoard?: NullableStringFieldUpdateOperationsInput | string | null
    controllingShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    controllingPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    publicShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    publicPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendPayoutRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendDateNote?: NullableStringFieldUpdateOperationsInput | string | null
    netProfitMargin?: NullableFloatFieldUpdateOperationsInput | number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: NullableStringFieldUpdateOperationsInput | string | null
    keyRisk?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockUncheckedUpdateManyInput = {
    ticker?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    subSector?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    marketCapLabel?: StringFieldUpdateOperationsInput | string
    revenueGrowth?: FloatFieldUpdateOperationsInput | number
    netIncomeGrowth?: FloatFieldUpdateOperationsInput | number
    roe?: FloatFieldUpdateOperationsInput | number
    per?: FloatFieldUpdateOperationsInput | number
    pbv?: NullableFloatFieldUpdateOperationsInput | number | null
    der?: NullableFloatFieldUpdateOperationsInput | number | null
    revenueLabel?: NullableStringFieldUpdateOperationsInput | string | null
    netIncomeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalAssetsLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEquityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    period?: StringFieldUpdateOperationsInput | string
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: NullableStringFieldUpdateOperationsInput | string | null
    dataStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasData?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ipoYear?: NullableIntFieldUpdateOperationsInput | number | null
    listingBoard?: NullableStringFieldUpdateOperationsInput | string | null
    controllingShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    controllingPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    publicShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    publicPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendPayoutRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendDateNote?: NullableStringFieldUpdateOperationsInput | string | null
    netProfitMargin?: NullableFloatFieldUpdateOperationsInput | number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: NullableStringFieldUpdateOperationsInput | string | null
    keyRisk?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiInsightCreateInput = {
    id?: string
    period?: string
    summary: string
    strengths: JsonNullValueInput | InputJsonValue
    considerations: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: string | null
    lastUpdated?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stock: StockCreateNestedOneWithoutAiInsightsInput
  }

  export type AiInsightUncheckedCreateInput = {
    id?: string
    stockTicker: string
    period?: string
    summary: string
    strengths: JsonNullValueInput | InputJsonValue
    considerations: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: string | null
    lastUpdated?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiInsightUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: JsonNullValueInput | InputJsonValue
    considerations?: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUpdateOneRequiredWithoutAiInsightsNestedInput
  }

  export type AiInsightUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stockTicker?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: JsonNullValueInput | InputJsonValue
    considerations?: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiInsightCreateManyInput = {
    id?: string
    stockTicker: string
    period?: string
    summary: string
    strengths: JsonNullValueInput | InputJsonValue
    considerations: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: string | null
    lastUpdated?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiInsightUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: JsonNullValueInput | InputJsonValue
    considerations?: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiInsightUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stockTicker?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: JsonNullValueInput | InputJsonValue
    considerations?: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatLogCreateInput = {
    id?: string
    userEmail?: string
    sender?: string
    message: string
    period?: string | null
    createdAt?: Date | string
    stock: StockCreateNestedOneWithoutAiChatLogsInput
  }

  export type AiChatLogUncheckedCreateInput = {
    id?: string
    userEmail?: string
    stockTicker: string
    sender?: string
    message: string
    period?: string | null
    createdAt?: Date | string
  }

  export type AiChatLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    period?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUpdateOneRequiredWithoutAiChatLogsNestedInput
  }

  export type AiChatLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    stockTicker?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    period?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatLogCreateManyInput = {
    id?: string
    userEmail?: string
    stockTicker: string
    sender?: string
    message: string
    period?: string | null
    createdAt?: Date | string
  }

  export type AiChatLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    period?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    stockTicker?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    period?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotSimulationCreateInput = {
    id?: string
    pricePerShare: number
    pricePerLot: number
    targetBudget: number
    brokerFeePercent?: number
    calculatedLots: number
    totalStockCost: number
    brokerFeeAmount: number
    totalSpent: number
    remainingCash: number
    aiCommentary?: string | null
    createdAt?: Date | string
    stock: StockCreateNestedOneWithoutLotSimulationsInput
  }

  export type LotSimulationUncheckedCreateInput = {
    id?: string
    stockTicker: string
    pricePerShare: number
    pricePerLot: number
    targetBudget: number
    brokerFeePercent?: number
    calculatedLots: number
    totalStockCost: number
    brokerFeeAmount: number
    totalSpent: number
    remainingCash: number
    aiCommentary?: string | null
    createdAt?: Date | string
  }

  export type LotSimulationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    targetBudget?: FloatFieldUpdateOperationsInput | number
    brokerFeePercent?: FloatFieldUpdateOperationsInput | number
    calculatedLots?: IntFieldUpdateOperationsInput | number
    totalStockCost?: FloatFieldUpdateOperationsInput | number
    brokerFeeAmount?: FloatFieldUpdateOperationsInput | number
    totalSpent?: FloatFieldUpdateOperationsInput | number
    remainingCash?: FloatFieldUpdateOperationsInput | number
    aiCommentary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUpdateOneRequiredWithoutLotSimulationsNestedInput
  }

  export type LotSimulationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stockTicker?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    targetBudget?: FloatFieldUpdateOperationsInput | number
    brokerFeePercent?: FloatFieldUpdateOperationsInput | number
    calculatedLots?: IntFieldUpdateOperationsInput | number
    totalStockCost?: FloatFieldUpdateOperationsInput | number
    brokerFeeAmount?: FloatFieldUpdateOperationsInput | number
    totalSpent?: FloatFieldUpdateOperationsInput | number
    remainingCash?: FloatFieldUpdateOperationsInput | number
    aiCommentary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotSimulationCreateManyInput = {
    id?: string
    stockTicker: string
    pricePerShare: number
    pricePerLot: number
    targetBudget: number
    brokerFeePercent?: number
    calculatedLots: number
    totalStockCost: number
    brokerFeeAmount: number
    totalSpent: number
    remainingCash: number
    aiCommentary?: string | null
    createdAt?: Date | string
  }

  export type LotSimulationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    targetBudget?: FloatFieldUpdateOperationsInput | number
    brokerFeePercent?: FloatFieldUpdateOperationsInput | number
    calculatedLots?: IntFieldUpdateOperationsInput | number
    totalStockCost?: FloatFieldUpdateOperationsInput | number
    brokerFeeAmount?: FloatFieldUpdateOperationsInput | number
    totalSpent?: FloatFieldUpdateOperationsInput | number
    remainingCash?: FloatFieldUpdateOperationsInput | number
    aiCommentary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotSimulationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stockTicker?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    targetBudget?: FloatFieldUpdateOperationsInput | number
    brokerFeePercent?: FloatFieldUpdateOperationsInput | number
    calculatedLots?: IntFieldUpdateOperationsInput | number
    totalStockCost?: FloatFieldUpdateOperationsInput | number
    brokerFeeAmount?: FloatFieldUpdateOperationsInput | number
    totalSpent?: FloatFieldUpdateOperationsInput | number
    remainingCash?: FloatFieldUpdateOperationsInput | number
    aiCommentary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistCreateInput = {
    id?: string
    userEmail?: string
    notes?: string | null
    createdAt?: Date | string
    stock: StockCreateNestedOneWithoutWatchlistsInput
  }

  export type WatchlistUncheckedCreateInput = {
    id?: string
    userEmail?: string
    stockTicker: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type WatchlistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUpdateOneRequiredWithoutWatchlistsNestedInput
  }

  export type WatchlistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    stockTicker?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistCreateManyInput = {
    id?: string
    userEmail?: string
    stockTicker: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type WatchlistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    stockTicker?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    experienceLevel?: string
    initialCapital?: number | null
    initialCapitalLabel?: string | null
    preferredSectors?: NullableJsonNullValueInput | InputJsonValue
    bio?: string | null
    notificationsEnabled?: boolean
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    experienceLevel?: string
    initialCapital?: number | null
    initialCapitalLabel?: string | null
    preferredSectors?: NullableJsonNullValueInput | InputJsonValue
    bio?: string | null
    notificationsEnabled?: boolean
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    experienceLevel?: StringFieldUpdateOperationsInput | string
    initialCapital?: NullableFloatFieldUpdateOperationsInput | number | null
    initialCapitalLabel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredSectors?: NullableJsonNullValueInput | InputJsonValue
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    experienceLevel?: StringFieldUpdateOperationsInput | string
    initialCapital?: NullableFloatFieldUpdateOperationsInput | number | null
    initialCapitalLabel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredSectors?: NullableJsonNullValueInput | InputJsonValue
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    experienceLevel?: string
    initialCapital?: number | null
    initialCapitalLabel?: string | null
    preferredSectors?: NullableJsonNullValueInput | InputJsonValue
    bio?: string | null
    notificationsEnabled?: boolean
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    experienceLevel?: StringFieldUpdateOperationsInput | string
    initialCapital?: NullableFloatFieldUpdateOperationsInput | number | null
    initialCapitalLabel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredSectors?: NullableJsonNullValueInput | InputJsonValue
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    experienceLevel?: StringFieldUpdateOperationsInput | string
    initialCapital?: NullableFloatFieldUpdateOperationsInput | number | null
    initialCapitalLabel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredSectors?: NullableJsonNullValueInput | InputJsonValue
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AiInsightListRelationFilter = {
    every?: AiInsightWhereInput
    some?: AiInsightWhereInput
    none?: AiInsightWhereInput
  }

  export type AiChatLogListRelationFilter = {
    every?: AiChatLogWhereInput
    some?: AiChatLogWhereInput
    none?: AiChatLogWhereInput
  }

  export type LotSimulationListRelationFilter = {
    every?: LotSimulationWhereInput
    some?: LotSimulationWhereInput
    none?: LotSimulationWhereInput
  }

  export type WatchlistListRelationFilter = {
    every?: WatchlistWhereInput
    some?: WatchlistWhereInput
    none?: WatchlistWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AiInsightOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AiChatLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LotSimulationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WatchlistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StockOrderByRelevanceInput = {
    fields: StockOrderByRelevanceFieldEnum | StockOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type StockCountOrderByAggregateInput = {
    ticker?: SortOrder
    name?: SortOrder
    sector?: SortOrder
    subSector?: SortOrder
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    marketCap?: SortOrder
    marketCapLabel?: SortOrder
    revenueGrowth?: SortOrder
    netIncomeGrowth?: SortOrder
    roe?: SortOrder
    per?: SortOrder
    pbv?: SortOrder
    der?: SortOrder
    revenueLabel?: SortOrder
    netIncomeLabel?: SortOrder
    totalAssetsLabel?: SortOrder
    totalEquityLabel?: SortOrder
    period?: SortOrder
    lastUpdated?: SortOrder
    dataSource?: SortOrder
    dataStatus?: SortOrder
    hasData?: SortOrder
    description?: SortOrder
    ipoYear?: SortOrder
    listingBoard?: SortOrder
    controllingShareholder?: SortOrder
    controllingPercentage?: SortOrder
    publicShareholder?: SortOrder
    publicPercentage?: SortOrder
    businessSegments?: SortOrder
    dividendYield?: SortOrder
    dividendPayoutRatio?: SortOrder
    dividendDateNote?: SortOrder
    netProfitMargin?: SortOrder
    sectorSpecificMetric?: SortOrder
    keyMoat?: SortOrder
    keyRisk?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockAvgOrderByAggregateInput = {
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    marketCap?: SortOrder
    revenueGrowth?: SortOrder
    netIncomeGrowth?: SortOrder
    roe?: SortOrder
    per?: SortOrder
    pbv?: SortOrder
    der?: SortOrder
    ipoYear?: SortOrder
    controllingPercentage?: SortOrder
    publicPercentage?: SortOrder
    dividendYield?: SortOrder
    dividendPayoutRatio?: SortOrder
    netProfitMargin?: SortOrder
  }

  export type StockMaxOrderByAggregateInput = {
    ticker?: SortOrder
    name?: SortOrder
    sector?: SortOrder
    subSector?: SortOrder
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    marketCap?: SortOrder
    marketCapLabel?: SortOrder
    revenueGrowth?: SortOrder
    netIncomeGrowth?: SortOrder
    roe?: SortOrder
    per?: SortOrder
    pbv?: SortOrder
    der?: SortOrder
    revenueLabel?: SortOrder
    netIncomeLabel?: SortOrder
    totalAssetsLabel?: SortOrder
    totalEquityLabel?: SortOrder
    period?: SortOrder
    lastUpdated?: SortOrder
    dataSource?: SortOrder
    dataStatus?: SortOrder
    hasData?: SortOrder
    description?: SortOrder
    ipoYear?: SortOrder
    listingBoard?: SortOrder
    controllingShareholder?: SortOrder
    controllingPercentage?: SortOrder
    publicShareholder?: SortOrder
    publicPercentage?: SortOrder
    dividendYield?: SortOrder
    dividendPayoutRatio?: SortOrder
    dividendDateNote?: SortOrder
    netProfitMargin?: SortOrder
    keyMoat?: SortOrder
    keyRisk?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockMinOrderByAggregateInput = {
    ticker?: SortOrder
    name?: SortOrder
    sector?: SortOrder
    subSector?: SortOrder
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    marketCap?: SortOrder
    marketCapLabel?: SortOrder
    revenueGrowth?: SortOrder
    netIncomeGrowth?: SortOrder
    roe?: SortOrder
    per?: SortOrder
    pbv?: SortOrder
    der?: SortOrder
    revenueLabel?: SortOrder
    netIncomeLabel?: SortOrder
    totalAssetsLabel?: SortOrder
    totalEquityLabel?: SortOrder
    period?: SortOrder
    lastUpdated?: SortOrder
    dataSource?: SortOrder
    dataStatus?: SortOrder
    hasData?: SortOrder
    description?: SortOrder
    ipoYear?: SortOrder
    listingBoard?: SortOrder
    controllingShareholder?: SortOrder
    controllingPercentage?: SortOrder
    publicShareholder?: SortOrder
    publicPercentage?: SortOrder
    dividendYield?: SortOrder
    dividendPayoutRatio?: SortOrder
    dividendDateNote?: SortOrder
    netProfitMargin?: SortOrder
    keyMoat?: SortOrder
    keyRisk?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockSumOrderByAggregateInput = {
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    marketCap?: SortOrder
    revenueGrowth?: SortOrder
    netIncomeGrowth?: SortOrder
    roe?: SortOrder
    per?: SortOrder
    pbv?: SortOrder
    der?: SortOrder
    ipoYear?: SortOrder
    controllingPercentage?: SortOrder
    publicPercentage?: SortOrder
    dividendYield?: SortOrder
    dividendPayoutRatio?: SortOrder
    netProfitMargin?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StockScalarRelationFilter = {
    is?: StockWhereInput
    isNot?: StockWhereInput
  }

  export type AiInsightOrderByRelevanceInput = {
    fields: AiInsightOrderByRelevanceFieldEnum | AiInsightOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AiInsightCountOrderByAggregateInput = {
    id?: SortOrder
    stockTicker?: SortOrder
    period?: SortOrder
    summary?: SortOrder
    strengths?: SortOrder
    considerations?: SortOrder
    factPoints?: SortOrder
    interpretationPoints?: SortOrder
    disclaimer?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiInsightMaxOrderByAggregateInput = {
    id?: SortOrder
    stockTicker?: SortOrder
    period?: SortOrder
    summary?: SortOrder
    disclaimer?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiInsightMinOrderByAggregateInput = {
    id?: SortOrder
    stockTicker?: SortOrder
    period?: SortOrder
    summary?: SortOrder
    disclaimer?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type AiChatLogOrderByRelevanceInput = {
    fields: AiChatLogOrderByRelevanceFieldEnum | AiChatLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AiChatLogCountOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    stockTicker?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    period?: SortOrder
    createdAt?: SortOrder
  }

  export type AiChatLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    stockTicker?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    period?: SortOrder
    createdAt?: SortOrder
  }

  export type AiChatLogMinOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    stockTicker?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    period?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type LotSimulationOrderByRelevanceInput = {
    fields: LotSimulationOrderByRelevanceFieldEnum | LotSimulationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type LotSimulationCountOrderByAggregateInput = {
    id?: SortOrder
    stockTicker?: SortOrder
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    targetBudget?: SortOrder
    brokerFeePercent?: SortOrder
    calculatedLots?: SortOrder
    totalStockCost?: SortOrder
    brokerFeeAmount?: SortOrder
    totalSpent?: SortOrder
    remainingCash?: SortOrder
    aiCommentary?: SortOrder
    createdAt?: SortOrder
  }

  export type LotSimulationAvgOrderByAggregateInput = {
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    targetBudget?: SortOrder
    brokerFeePercent?: SortOrder
    calculatedLots?: SortOrder
    totalStockCost?: SortOrder
    brokerFeeAmount?: SortOrder
    totalSpent?: SortOrder
    remainingCash?: SortOrder
  }

  export type LotSimulationMaxOrderByAggregateInput = {
    id?: SortOrder
    stockTicker?: SortOrder
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    targetBudget?: SortOrder
    brokerFeePercent?: SortOrder
    calculatedLots?: SortOrder
    totalStockCost?: SortOrder
    brokerFeeAmount?: SortOrder
    totalSpent?: SortOrder
    remainingCash?: SortOrder
    aiCommentary?: SortOrder
    createdAt?: SortOrder
  }

  export type LotSimulationMinOrderByAggregateInput = {
    id?: SortOrder
    stockTicker?: SortOrder
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    targetBudget?: SortOrder
    brokerFeePercent?: SortOrder
    calculatedLots?: SortOrder
    totalStockCost?: SortOrder
    brokerFeeAmount?: SortOrder
    totalSpent?: SortOrder
    remainingCash?: SortOrder
    aiCommentary?: SortOrder
    createdAt?: SortOrder
  }

  export type LotSimulationSumOrderByAggregateInput = {
    pricePerShare?: SortOrder
    pricePerLot?: SortOrder
    targetBudget?: SortOrder
    brokerFeePercent?: SortOrder
    calculatedLots?: SortOrder
    totalStockCost?: SortOrder
    brokerFeeAmount?: SortOrder
    totalSpent?: SortOrder
    remainingCash?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type WatchlistOrderByRelevanceInput = {
    fields: WatchlistOrderByRelevanceFieldEnum | WatchlistOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type WatchlistUserEmailStockTickerCompoundUniqueInput = {
    userEmail: string
    stockTicker: string
  }

  export type WatchlistCountOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    stockTicker?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type WatchlistMaxOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    stockTicker?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type WatchlistMinOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    stockTicker?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    experienceLevel?: SortOrder
    initialCapital?: SortOrder
    initialCapitalLabel?: SortOrder
    preferredSectors?: SortOrder
    bio?: SortOrder
    notificationsEnabled?: SortOrder
    resetToken?: SortOrder
    resetTokenExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    initialCapital?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    experienceLevel?: SortOrder
    initialCapital?: SortOrder
    initialCapitalLabel?: SortOrder
    bio?: SortOrder
    notificationsEnabled?: SortOrder
    resetToken?: SortOrder
    resetTokenExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    experienceLevel?: SortOrder
    initialCapital?: SortOrder
    initialCapitalLabel?: SortOrder
    bio?: SortOrder
    notificationsEnabled?: SortOrder
    resetToken?: SortOrder
    resetTokenExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    initialCapital?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AiInsightCreateNestedManyWithoutStockInput = {
    create?: XOR<AiInsightCreateWithoutStockInput, AiInsightUncheckedCreateWithoutStockInput> | AiInsightCreateWithoutStockInput[] | AiInsightUncheckedCreateWithoutStockInput[]
    connectOrCreate?: AiInsightCreateOrConnectWithoutStockInput | AiInsightCreateOrConnectWithoutStockInput[]
    createMany?: AiInsightCreateManyStockInputEnvelope
    connect?: AiInsightWhereUniqueInput | AiInsightWhereUniqueInput[]
  }

  export type AiChatLogCreateNestedManyWithoutStockInput = {
    create?: XOR<AiChatLogCreateWithoutStockInput, AiChatLogUncheckedCreateWithoutStockInput> | AiChatLogCreateWithoutStockInput[] | AiChatLogUncheckedCreateWithoutStockInput[]
    connectOrCreate?: AiChatLogCreateOrConnectWithoutStockInput | AiChatLogCreateOrConnectWithoutStockInput[]
    createMany?: AiChatLogCreateManyStockInputEnvelope
    connect?: AiChatLogWhereUniqueInput | AiChatLogWhereUniqueInput[]
  }

  export type LotSimulationCreateNestedManyWithoutStockInput = {
    create?: XOR<LotSimulationCreateWithoutStockInput, LotSimulationUncheckedCreateWithoutStockInput> | LotSimulationCreateWithoutStockInput[] | LotSimulationUncheckedCreateWithoutStockInput[]
    connectOrCreate?: LotSimulationCreateOrConnectWithoutStockInput | LotSimulationCreateOrConnectWithoutStockInput[]
    createMany?: LotSimulationCreateManyStockInputEnvelope
    connect?: LotSimulationWhereUniqueInput | LotSimulationWhereUniqueInput[]
  }

  export type WatchlistCreateNestedManyWithoutStockInput = {
    create?: XOR<WatchlistCreateWithoutStockInput, WatchlistUncheckedCreateWithoutStockInput> | WatchlistCreateWithoutStockInput[] | WatchlistUncheckedCreateWithoutStockInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutStockInput | WatchlistCreateOrConnectWithoutStockInput[]
    createMany?: WatchlistCreateManyStockInputEnvelope
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
  }

  export type AiInsightUncheckedCreateNestedManyWithoutStockInput = {
    create?: XOR<AiInsightCreateWithoutStockInput, AiInsightUncheckedCreateWithoutStockInput> | AiInsightCreateWithoutStockInput[] | AiInsightUncheckedCreateWithoutStockInput[]
    connectOrCreate?: AiInsightCreateOrConnectWithoutStockInput | AiInsightCreateOrConnectWithoutStockInput[]
    createMany?: AiInsightCreateManyStockInputEnvelope
    connect?: AiInsightWhereUniqueInput | AiInsightWhereUniqueInput[]
  }

  export type AiChatLogUncheckedCreateNestedManyWithoutStockInput = {
    create?: XOR<AiChatLogCreateWithoutStockInput, AiChatLogUncheckedCreateWithoutStockInput> | AiChatLogCreateWithoutStockInput[] | AiChatLogUncheckedCreateWithoutStockInput[]
    connectOrCreate?: AiChatLogCreateOrConnectWithoutStockInput | AiChatLogCreateOrConnectWithoutStockInput[]
    createMany?: AiChatLogCreateManyStockInputEnvelope
    connect?: AiChatLogWhereUniqueInput | AiChatLogWhereUniqueInput[]
  }

  export type LotSimulationUncheckedCreateNestedManyWithoutStockInput = {
    create?: XOR<LotSimulationCreateWithoutStockInput, LotSimulationUncheckedCreateWithoutStockInput> | LotSimulationCreateWithoutStockInput[] | LotSimulationUncheckedCreateWithoutStockInput[]
    connectOrCreate?: LotSimulationCreateOrConnectWithoutStockInput | LotSimulationCreateOrConnectWithoutStockInput[]
    createMany?: LotSimulationCreateManyStockInputEnvelope
    connect?: LotSimulationWhereUniqueInput | LotSimulationWhereUniqueInput[]
  }

  export type WatchlistUncheckedCreateNestedManyWithoutStockInput = {
    create?: XOR<WatchlistCreateWithoutStockInput, WatchlistUncheckedCreateWithoutStockInput> | WatchlistCreateWithoutStockInput[] | WatchlistUncheckedCreateWithoutStockInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutStockInput | WatchlistCreateOrConnectWithoutStockInput[]
    createMany?: WatchlistCreateManyStockInputEnvelope
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AiInsightUpdateManyWithoutStockNestedInput = {
    create?: XOR<AiInsightCreateWithoutStockInput, AiInsightUncheckedCreateWithoutStockInput> | AiInsightCreateWithoutStockInput[] | AiInsightUncheckedCreateWithoutStockInput[]
    connectOrCreate?: AiInsightCreateOrConnectWithoutStockInput | AiInsightCreateOrConnectWithoutStockInput[]
    upsert?: AiInsightUpsertWithWhereUniqueWithoutStockInput | AiInsightUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: AiInsightCreateManyStockInputEnvelope
    set?: AiInsightWhereUniqueInput | AiInsightWhereUniqueInput[]
    disconnect?: AiInsightWhereUniqueInput | AiInsightWhereUniqueInput[]
    delete?: AiInsightWhereUniqueInput | AiInsightWhereUniqueInput[]
    connect?: AiInsightWhereUniqueInput | AiInsightWhereUniqueInput[]
    update?: AiInsightUpdateWithWhereUniqueWithoutStockInput | AiInsightUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: AiInsightUpdateManyWithWhereWithoutStockInput | AiInsightUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: AiInsightScalarWhereInput | AiInsightScalarWhereInput[]
  }

  export type AiChatLogUpdateManyWithoutStockNestedInput = {
    create?: XOR<AiChatLogCreateWithoutStockInput, AiChatLogUncheckedCreateWithoutStockInput> | AiChatLogCreateWithoutStockInput[] | AiChatLogUncheckedCreateWithoutStockInput[]
    connectOrCreate?: AiChatLogCreateOrConnectWithoutStockInput | AiChatLogCreateOrConnectWithoutStockInput[]
    upsert?: AiChatLogUpsertWithWhereUniqueWithoutStockInput | AiChatLogUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: AiChatLogCreateManyStockInputEnvelope
    set?: AiChatLogWhereUniqueInput | AiChatLogWhereUniqueInput[]
    disconnect?: AiChatLogWhereUniqueInput | AiChatLogWhereUniqueInput[]
    delete?: AiChatLogWhereUniqueInput | AiChatLogWhereUniqueInput[]
    connect?: AiChatLogWhereUniqueInput | AiChatLogWhereUniqueInput[]
    update?: AiChatLogUpdateWithWhereUniqueWithoutStockInput | AiChatLogUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: AiChatLogUpdateManyWithWhereWithoutStockInput | AiChatLogUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: AiChatLogScalarWhereInput | AiChatLogScalarWhereInput[]
  }

  export type LotSimulationUpdateManyWithoutStockNestedInput = {
    create?: XOR<LotSimulationCreateWithoutStockInput, LotSimulationUncheckedCreateWithoutStockInput> | LotSimulationCreateWithoutStockInput[] | LotSimulationUncheckedCreateWithoutStockInput[]
    connectOrCreate?: LotSimulationCreateOrConnectWithoutStockInput | LotSimulationCreateOrConnectWithoutStockInput[]
    upsert?: LotSimulationUpsertWithWhereUniqueWithoutStockInput | LotSimulationUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: LotSimulationCreateManyStockInputEnvelope
    set?: LotSimulationWhereUniqueInput | LotSimulationWhereUniqueInput[]
    disconnect?: LotSimulationWhereUniqueInput | LotSimulationWhereUniqueInput[]
    delete?: LotSimulationWhereUniqueInput | LotSimulationWhereUniqueInput[]
    connect?: LotSimulationWhereUniqueInput | LotSimulationWhereUniqueInput[]
    update?: LotSimulationUpdateWithWhereUniqueWithoutStockInput | LotSimulationUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: LotSimulationUpdateManyWithWhereWithoutStockInput | LotSimulationUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: LotSimulationScalarWhereInput | LotSimulationScalarWhereInput[]
  }

  export type WatchlistUpdateManyWithoutStockNestedInput = {
    create?: XOR<WatchlistCreateWithoutStockInput, WatchlistUncheckedCreateWithoutStockInput> | WatchlistCreateWithoutStockInput[] | WatchlistUncheckedCreateWithoutStockInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutStockInput | WatchlistCreateOrConnectWithoutStockInput[]
    upsert?: WatchlistUpsertWithWhereUniqueWithoutStockInput | WatchlistUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: WatchlistCreateManyStockInputEnvelope
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    update?: WatchlistUpdateWithWhereUniqueWithoutStockInput | WatchlistUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: WatchlistUpdateManyWithWhereWithoutStockInput | WatchlistUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
  }

  export type AiInsightUncheckedUpdateManyWithoutStockNestedInput = {
    create?: XOR<AiInsightCreateWithoutStockInput, AiInsightUncheckedCreateWithoutStockInput> | AiInsightCreateWithoutStockInput[] | AiInsightUncheckedCreateWithoutStockInput[]
    connectOrCreate?: AiInsightCreateOrConnectWithoutStockInput | AiInsightCreateOrConnectWithoutStockInput[]
    upsert?: AiInsightUpsertWithWhereUniqueWithoutStockInput | AiInsightUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: AiInsightCreateManyStockInputEnvelope
    set?: AiInsightWhereUniqueInput | AiInsightWhereUniqueInput[]
    disconnect?: AiInsightWhereUniqueInput | AiInsightWhereUniqueInput[]
    delete?: AiInsightWhereUniqueInput | AiInsightWhereUniqueInput[]
    connect?: AiInsightWhereUniqueInput | AiInsightWhereUniqueInput[]
    update?: AiInsightUpdateWithWhereUniqueWithoutStockInput | AiInsightUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: AiInsightUpdateManyWithWhereWithoutStockInput | AiInsightUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: AiInsightScalarWhereInput | AiInsightScalarWhereInput[]
  }

  export type AiChatLogUncheckedUpdateManyWithoutStockNestedInput = {
    create?: XOR<AiChatLogCreateWithoutStockInput, AiChatLogUncheckedCreateWithoutStockInput> | AiChatLogCreateWithoutStockInput[] | AiChatLogUncheckedCreateWithoutStockInput[]
    connectOrCreate?: AiChatLogCreateOrConnectWithoutStockInput | AiChatLogCreateOrConnectWithoutStockInput[]
    upsert?: AiChatLogUpsertWithWhereUniqueWithoutStockInput | AiChatLogUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: AiChatLogCreateManyStockInputEnvelope
    set?: AiChatLogWhereUniqueInput | AiChatLogWhereUniqueInput[]
    disconnect?: AiChatLogWhereUniqueInput | AiChatLogWhereUniqueInput[]
    delete?: AiChatLogWhereUniqueInput | AiChatLogWhereUniqueInput[]
    connect?: AiChatLogWhereUniqueInput | AiChatLogWhereUniqueInput[]
    update?: AiChatLogUpdateWithWhereUniqueWithoutStockInput | AiChatLogUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: AiChatLogUpdateManyWithWhereWithoutStockInput | AiChatLogUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: AiChatLogScalarWhereInput | AiChatLogScalarWhereInput[]
  }

  export type LotSimulationUncheckedUpdateManyWithoutStockNestedInput = {
    create?: XOR<LotSimulationCreateWithoutStockInput, LotSimulationUncheckedCreateWithoutStockInput> | LotSimulationCreateWithoutStockInput[] | LotSimulationUncheckedCreateWithoutStockInput[]
    connectOrCreate?: LotSimulationCreateOrConnectWithoutStockInput | LotSimulationCreateOrConnectWithoutStockInput[]
    upsert?: LotSimulationUpsertWithWhereUniqueWithoutStockInput | LotSimulationUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: LotSimulationCreateManyStockInputEnvelope
    set?: LotSimulationWhereUniqueInput | LotSimulationWhereUniqueInput[]
    disconnect?: LotSimulationWhereUniqueInput | LotSimulationWhereUniqueInput[]
    delete?: LotSimulationWhereUniqueInput | LotSimulationWhereUniqueInput[]
    connect?: LotSimulationWhereUniqueInput | LotSimulationWhereUniqueInput[]
    update?: LotSimulationUpdateWithWhereUniqueWithoutStockInput | LotSimulationUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: LotSimulationUpdateManyWithWhereWithoutStockInput | LotSimulationUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: LotSimulationScalarWhereInput | LotSimulationScalarWhereInput[]
  }

  export type WatchlistUncheckedUpdateManyWithoutStockNestedInput = {
    create?: XOR<WatchlistCreateWithoutStockInput, WatchlistUncheckedCreateWithoutStockInput> | WatchlistCreateWithoutStockInput[] | WatchlistUncheckedCreateWithoutStockInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutStockInput | WatchlistCreateOrConnectWithoutStockInput[]
    upsert?: WatchlistUpsertWithWhereUniqueWithoutStockInput | WatchlistUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: WatchlistCreateManyStockInputEnvelope
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    update?: WatchlistUpdateWithWhereUniqueWithoutStockInput | WatchlistUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: WatchlistUpdateManyWithWhereWithoutStockInput | WatchlistUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
  }

  export type StockCreateNestedOneWithoutAiInsightsInput = {
    create?: XOR<StockCreateWithoutAiInsightsInput, StockUncheckedCreateWithoutAiInsightsInput>
    connectOrCreate?: StockCreateOrConnectWithoutAiInsightsInput
    connect?: StockWhereUniqueInput
  }

  export type StockUpdateOneRequiredWithoutAiInsightsNestedInput = {
    create?: XOR<StockCreateWithoutAiInsightsInput, StockUncheckedCreateWithoutAiInsightsInput>
    connectOrCreate?: StockCreateOrConnectWithoutAiInsightsInput
    upsert?: StockUpsertWithoutAiInsightsInput
    connect?: StockWhereUniqueInput
    update?: XOR<XOR<StockUpdateToOneWithWhereWithoutAiInsightsInput, StockUpdateWithoutAiInsightsInput>, StockUncheckedUpdateWithoutAiInsightsInput>
  }

  export type StockCreateNestedOneWithoutAiChatLogsInput = {
    create?: XOR<StockCreateWithoutAiChatLogsInput, StockUncheckedCreateWithoutAiChatLogsInput>
    connectOrCreate?: StockCreateOrConnectWithoutAiChatLogsInput
    connect?: StockWhereUniqueInput
  }

  export type StockUpdateOneRequiredWithoutAiChatLogsNestedInput = {
    create?: XOR<StockCreateWithoutAiChatLogsInput, StockUncheckedCreateWithoutAiChatLogsInput>
    connectOrCreate?: StockCreateOrConnectWithoutAiChatLogsInput
    upsert?: StockUpsertWithoutAiChatLogsInput
    connect?: StockWhereUniqueInput
    update?: XOR<XOR<StockUpdateToOneWithWhereWithoutAiChatLogsInput, StockUpdateWithoutAiChatLogsInput>, StockUncheckedUpdateWithoutAiChatLogsInput>
  }

  export type StockCreateNestedOneWithoutLotSimulationsInput = {
    create?: XOR<StockCreateWithoutLotSimulationsInput, StockUncheckedCreateWithoutLotSimulationsInput>
    connectOrCreate?: StockCreateOrConnectWithoutLotSimulationsInput
    connect?: StockWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StockUpdateOneRequiredWithoutLotSimulationsNestedInput = {
    create?: XOR<StockCreateWithoutLotSimulationsInput, StockUncheckedCreateWithoutLotSimulationsInput>
    connectOrCreate?: StockCreateOrConnectWithoutLotSimulationsInput
    upsert?: StockUpsertWithoutLotSimulationsInput
    connect?: StockWhereUniqueInput
    update?: XOR<XOR<StockUpdateToOneWithWhereWithoutLotSimulationsInput, StockUpdateWithoutLotSimulationsInput>, StockUncheckedUpdateWithoutLotSimulationsInput>
  }

  export type StockCreateNestedOneWithoutWatchlistsInput = {
    create?: XOR<StockCreateWithoutWatchlistsInput, StockUncheckedCreateWithoutWatchlistsInput>
    connectOrCreate?: StockCreateOrConnectWithoutWatchlistsInput
    connect?: StockWhereUniqueInput
  }

  export type StockUpdateOneRequiredWithoutWatchlistsNestedInput = {
    create?: XOR<StockCreateWithoutWatchlistsInput, StockUncheckedCreateWithoutWatchlistsInput>
    connectOrCreate?: StockCreateOrConnectWithoutWatchlistsInput
    upsert?: StockUpsertWithoutWatchlistsInput
    connect?: StockWhereUniqueInput
    update?: XOR<XOR<StockUpdateToOneWithWhereWithoutWatchlistsInput, StockUpdateWithoutWatchlistsInput>, StockUncheckedUpdateWithoutWatchlistsInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AiInsightCreateWithoutStockInput = {
    id?: string
    period?: string
    summary: string
    strengths: JsonNullValueInput | InputJsonValue
    considerations: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: string | null
    lastUpdated?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiInsightUncheckedCreateWithoutStockInput = {
    id?: string
    period?: string
    summary: string
    strengths: JsonNullValueInput | InputJsonValue
    considerations: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: string | null
    lastUpdated?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiInsightCreateOrConnectWithoutStockInput = {
    where: AiInsightWhereUniqueInput
    create: XOR<AiInsightCreateWithoutStockInput, AiInsightUncheckedCreateWithoutStockInput>
  }

  export type AiInsightCreateManyStockInputEnvelope = {
    data: AiInsightCreateManyStockInput | AiInsightCreateManyStockInput[]
    skipDuplicates?: boolean
  }

  export type AiChatLogCreateWithoutStockInput = {
    id?: string
    userEmail?: string
    sender?: string
    message: string
    period?: string | null
    createdAt?: Date | string
  }

  export type AiChatLogUncheckedCreateWithoutStockInput = {
    id?: string
    userEmail?: string
    sender?: string
    message: string
    period?: string | null
    createdAt?: Date | string
  }

  export type AiChatLogCreateOrConnectWithoutStockInput = {
    where: AiChatLogWhereUniqueInput
    create: XOR<AiChatLogCreateWithoutStockInput, AiChatLogUncheckedCreateWithoutStockInput>
  }

  export type AiChatLogCreateManyStockInputEnvelope = {
    data: AiChatLogCreateManyStockInput | AiChatLogCreateManyStockInput[]
    skipDuplicates?: boolean
  }

  export type LotSimulationCreateWithoutStockInput = {
    id?: string
    pricePerShare: number
    pricePerLot: number
    targetBudget: number
    brokerFeePercent?: number
    calculatedLots: number
    totalStockCost: number
    brokerFeeAmount: number
    totalSpent: number
    remainingCash: number
    aiCommentary?: string | null
    createdAt?: Date | string
  }

  export type LotSimulationUncheckedCreateWithoutStockInput = {
    id?: string
    pricePerShare: number
    pricePerLot: number
    targetBudget: number
    brokerFeePercent?: number
    calculatedLots: number
    totalStockCost: number
    brokerFeeAmount: number
    totalSpent: number
    remainingCash: number
    aiCommentary?: string | null
    createdAt?: Date | string
  }

  export type LotSimulationCreateOrConnectWithoutStockInput = {
    where: LotSimulationWhereUniqueInput
    create: XOR<LotSimulationCreateWithoutStockInput, LotSimulationUncheckedCreateWithoutStockInput>
  }

  export type LotSimulationCreateManyStockInputEnvelope = {
    data: LotSimulationCreateManyStockInput | LotSimulationCreateManyStockInput[]
    skipDuplicates?: boolean
  }

  export type WatchlistCreateWithoutStockInput = {
    id?: string
    userEmail?: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type WatchlistUncheckedCreateWithoutStockInput = {
    id?: string
    userEmail?: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type WatchlistCreateOrConnectWithoutStockInput = {
    where: WatchlistWhereUniqueInput
    create: XOR<WatchlistCreateWithoutStockInput, WatchlistUncheckedCreateWithoutStockInput>
  }

  export type WatchlistCreateManyStockInputEnvelope = {
    data: WatchlistCreateManyStockInput | WatchlistCreateManyStockInput[]
    skipDuplicates?: boolean
  }

  export type AiInsightUpsertWithWhereUniqueWithoutStockInput = {
    where: AiInsightWhereUniqueInput
    update: XOR<AiInsightUpdateWithoutStockInput, AiInsightUncheckedUpdateWithoutStockInput>
    create: XOR<AiInsightCreateWithoutStockInput, AiInsightUncheckedCreateWithoutStockInput>
  }

  export type AiInsightUpdateWithWhereUniqueWithoutStockInput = {
    where: AiInsightWhereUniqueInput
    data: XOR<AiInsightUpdateWithoutStockInput, AiInsightUncheckedUpdateWithoutStockInput>
  }

  export type AiInsightUpdateManyWithWhereWithoutStockInput = {
    where: AiInsightScalarWhereInput
    data: XOR<AiInsightUpdateManyMutationInput, AiInsightUncheckedUpdateManyWithoutStockInput>
  }

  export type AiInsightScalarWhereInput = {
    AND?: AiInsightScalarWhereInput | AiInsightScalarWhereInput[]
    OR?: AiInsightScalarWhereInput[]
    NOT?: AiInsightScalarWhereInput | AiInsightScalarWhereInput[]
    id?: StringFilter<"AiInsight"> | string
    stockTicker?: StringFilter<"AiInsight"> | string
    period?: StringFilter<"AiInsight"> | string
    summary?: StringFilter<"AiInsight"> | string
    strengths?: JsonFilter<"AiInsight">
    considerations?: JsonFilter<"AiInsight">
    factPoints?: JsonNullableFilter<"AiInsight">
    interpretationPoints?: JsonNullableFilter<"AiInsight">
    disclaimer?: StringNullableFilter<"AiInsight"> | string | null
    lastUpdated?: StringNullableFilter<"AiInsight"> | string | null
    createdAt?: DateTimeFilter<"AiInsight"> | Date | string
    updatedAt?: DateTimeFilter<"AiInsight"> | Date | string
  }

  export type AiChatLogUpsertWithWhereUniqueWithoutStockInput = {
    where: AiChatLogWhereUniqueInput
    update: XOR<AiChatLogUpdateWithoutStockInput, AiChatLogUncheckedUpdateWithoutStockInput>
    create: XOR<AiChatLogCreateWithoutStockInput, AiChatLogUncheckedCreateWithoutStockInput>
  }

  export type AiChatLogUpdateWithWhereUniqueWithoutStockInput = {
    where: AiChatLogWhereUniqueInput
    data: XOR<AiChatLogUpdateWithoutStockInput, AiChatLogUncheckedUpdateWithoutStockInput>
  }

  export type AiChatLogUpdateManyWithWhereWithoutStockInput = {
    where: AiChatLogScalarWhereInput
    data: XOR<AiChatLogUpdateManyMutationInput, AiChatLogUncheckedUpdateManyWithoutStockInput>
  }

  export type AiChatLogScalarWhereInput = {
    AND?: AiChatLogScalarWhereInput | AiChatLogScalarWhereInput[]
    OR?: AiChatLogScalarWhereInput[]
    NOT?: AiChatLogScalarWhereInput | AiChatLogScalarWhereInput[]
    id?: StringFilter<"AiChatLog"> | string
    userEmail?: StringFilter<"AiChatLog"> | string
    stockTicker?: StringFilter<"AiChatLog"> | string
    sender?: StringFilter<"AiChatLog"> | string
    message?: StringFilter<"AiChatLog"> | string
    period?: StringNullableFilter<"AiChatLog"> | string | null
    createdAt?: DateTimeFilter<"AiChatLog"> | Date | string
  }

  export type LotSimulationUpsertWithWhereUniqueWithoutStockInput = {
    where: LotSimulationWhereUniqueInput
    update: XOR<LotSimulationUpdateWithoutStockInput, LotSimulationUncheckedUpdateWithoutStockInput>
    create: XOR<LotSimulationCreateWithoutStockInput, LotSimulationUncheckedCreateWithoutStockInput>
  }

  export type LotSimulationUpdateWithWhereUniqueWithoutStockInput = {
    where: LotSimulationWhereUniqueInput
    data: XOR<LotSimulationUpdateWithoutStockInput, LotSimulationUncheckedUpdateWithoutStockInput>
  }

  export type LotSimulationUpdateManyWithWhereWithoutStockInput = {
    where: LotSimulationScalarWhereInput
    data: XOR<LotSimulationUpdateManyMutationInput, LotSimulationUncheckedUpdateManyWithoutStockInput>
  }

  export type LotSimulationScalarWhereInput = {
    AND?: LotSimulationScalarWhereInput | LotSimulationScalarWhereInput[]
    OR?: LotSimulationScalarWhereInput[]
    NOT?: LotSimulationScalarWhereInput | LotSimulationScalarWhereInput[]
    id?: StringFilter<"LotSimulation"> | string
    stockTicker?: StringFilter<"LotSimulation"> | string
    pricePerShare?: FloatFilter<"LotSimulation"> | number
    pricePerLot?: FloatFilter<"LotSimulation"> | number
    targetBudget?: FloatFilter<"LotSimulation"> | number
    brokerFeePercent?: FloatFilter<"LotSimulation"> | number
    calculatedLots?: IntFilter<"LotSimulation"> | number
    totalStockCost?: FloatFilter<"LotSimulation"> | number
    brokerFeeAmount?: FloatFilter<"LotSimulation"> | number
    totalSpent?: FloatFilter<"LotSimulation"> | number
    remainingCash?: FloatFilter<"LotSimulation"> | number
    aiCommentary?: StringNullableFilter<"LotSimulation"> | string | null
    createdAt?: DateTimeFilter<"LotSimulation"> | Date | string
  }

  export type WatchlistUpsertWithWhereUniqueWithoutStockInput = {
    where: WatchlistWhereUniqueInput
    update: XOR<WatchlistUpdateWithoutStockInput, WatchlistUncheckedUpdateWithoutStockInput>
    create: XOR<WatchlistCreateWithoutStockInput, WatchlistUncheckedCreateWithoutStockInput>
  }

  export type WatchlistUpdateWithWhereUniqueWithoutStockInput = {
    where: WatchlistWhereUniqueInput
    data: XOR<WatchlistUpdateWithoutStockInput, WatchlistUncheckedUpdateWithoutStockInput>
  }

  export type WatchlistUpdateManyWithWhereWithoutStockInput = {
    where: WatchlistScalarWhereInput
    data: XOR<WatchlistUpdateManyMutationInput, WatchlistUncheckedUpdateManyWithoutStockInput>
  }

  export type WatchlistScalarWhereInput = {
    AND?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
    OR?: WatchlistScalarWhereInput[]
    NOT?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
    id?: StringFilter<"Watchlist"> | string
    userEmail?: StringFilter<"Watchlist"> | string
    stockTicker?: StringFilter<"Watchlist"> | string
    notes?: StringNullableFilter<"Watchlist"> | string | null
    createdAt?: DateTimeFilter<"Watchlist"> | Date | string
  }

  export type StockCreateWithoutAiInsightsInput = {
    ticker: string
    name: string
    sector: string
    subSector: string
    pricePerShare?: number
    pricePerLot?: number
    marketCap: number
    marketCapLabel: string
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv?: number | null
    der?: number | null
    revenueLabel?: string | null
    netIncomeLabel?: string | null
    totalAssetsLabel?: string | null
    totalEquityLabel?: string | null
    period?: string
    lastUpdated?: string | null
    dataSource?: string | null
    dataStatus?: string | null
    hasData?: boolean
    description?: string | null
    ipoYear?: number | null
    listingBoard?: string | null
    controllingShareholder?: string | null
    controllingPercentage?: number | null
    publicShareholder?: string | null
    publicPercentage?: number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: number | null
    dividendPayoutRatio?: number | null
    dividendDateNote?: string | null
    netProfitMargin?: number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: string | null
    keyRisk?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aiChatLogs?: AiChatLogCreateNestedManyWithoutStockInput
    lotSimulations?: LotSimulationCreateNestedManyWithoutStockInput
    watchlists?: WatchlistCreateNestedManyWithoutStockInput
  }

  export type StockUncheckedCreateWithoutAiInsightsInput = {
    ticker: string
    name: string
    sector: string
    subSector: string
    pricePerShare?: number
    pricePerLot?: number
    marketCap: number
    marketCapLabel: string
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv?: number | null
    der?: number | null
    revenueLabel?: string | null
    netIncomeLabel?: string | null
    totalAssetsLabel?: string | null
    totalEquityLabel?: string | null
    period?: string
    lastUpdated?: string | null
    dataSource?: string | null
    dataStatus?: string | null
    hasData?: boolean
    description?: string | null
    ipoYear?: number | null
    listingBoard?: string | null
    controllingShareholder?: string | null
    controllingPercentage?: number | null
    publicShareholder?: string | null
    publicPercentage?: number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: number | null
    dividendPayoutRatio?: number | null
    dividendDateNote?: string | null
    netProfitMargin?: number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: string | null
    keyRisk?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aiChatLogs?: AiChatLogUncheckedCreateNestedManyWithoutStockInput
    lotSimulations?: LotSimulationUncheckedCreateNestedManyWithoutStockInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutStockInput
  }

  export type StockCreateOrConnectWithoutAiInsightsInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutAiInsightsInput, StockUncheckedCreateWithoutAiInsightsInput>
  }

  export type StockUpsertWithoutAiInsightsInput = {
    update: XOR<StockUpdateWithoutAiInsightsInput, StockUncheckedUpdateWithoutAiInsightsInput>
    create: XOR<StockCreateWithoutAiInsightsInput, StockUncheckedCreateWithoutAiInsightsInput>
    where?: StockWhereInput
  }

  export type StockUpdateToOneWithWhereWithoutAiInsightsInput = {
    where?: StockWhereInput
    data: XOR<StockUpdateWithoutAiInsightsInput, StockUncheckedUpdateWithoutAiInsightsInput>
  }

  export type StockUpdateWithoutAiInsightsInput = {
    ticker?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    subSector?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    marketCapLabel?: StringFieldUpdateOperationsInput | string
    revenueGrowth?: FloatFieldUpdateOperationsInput | number
    netIncomeGrowth?: FloatFieldUpdateOperationsInput | number
    roe?: FloatFieldUpdateOperationsInput | number
    per?: FloatFieldUpdateOperationsInput | number
    pbv?: NullableFloatFieldUpdateOperationsInput | number | null
    der?: NullableFloatFieldUpdateOperationsInput | number | null
    revenueLabel?: NullableStringFieldUpdateOperationsInput | string | null
    netIncomeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalAssetsLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEquityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    period?: StringFieldUpdateOperationsInput | string
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: NullableStringFieldUpdateOperationsInput | string | null
    dataStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasData?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ipoYear?: NullableIntFieldUpdateOperationsInput | number | null
    listingBoard?: NullableStringFieldUpdateOperationsInput | string | null
    controllingShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    controllingPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    publicShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    publicPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendPayoutRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendDateNote?: NullableStringFieldUpdateOperationsInput | string | null
    netProfitMargin?: NullableFloatFieldUpdateOperationsInput | number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: NullableStringFieldUpdateOperationsInput | string | null
    keyRisk?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiChatLogs?: AiChatLogUpdateManyWithoutStockNestedInput
    lotSimulations?: LotSimulationUpdateManyWithoutStockNestedInput
    watchlists?: WatchlistUpdateManyWithoutStockNestedInput
  }

  export type StockUncheckedUpdateWithoutAiInsightsInput = {
    ticker?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    subSector?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    marketCapLabel?: StringFieldUpdateOperationsInput | string
    revenueGrowth?: FloatFieldUpdateOperationsInput | number
    netIncomeGrowth?: FloatFieldUpdateOperationsInput | number
    roe?: FloatFieldUpdateOperationsInput | number
    per?: FloatFieldUpdateOperationsInput | number
    pbv?: NullableFloatFieldUpdateOperationsInput | number | null
    der?: NullableFloatFieldUpdateOperationsInput | number | null
    revenueLabel?: NullableStringFieldUpdateOperationsInput | string | null
    netIncomeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalAssetsLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEquityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    period?: StringFieldUpdateOperationsInput | string
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: NullableStringFieldUpdateOperationsInput | string | null
    dataStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasData?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ipoYear?: NullableIntFieldUpdateOperationsInput | number | null
    listingBoard?: NullableStringFieldUpdateOperationsInput | string | null
    controllingShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    controllingPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    publicShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    publicPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendPayoutRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendDateNote?: NullableStringFieldUpdateOperationsInput | string | null
    netProfitMargin?: NullableFloatFieldUpdateOperationsInput | number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: NullableStringFieldUpdateOperationsInput | string | null
    keyRisk?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiChatLogs?: AiChatLogUncheckedUpdateManyWithoutStockNestedInput
    lotSimulations?: LotSimulationUncheckedUpdateManyWithoutStockNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutStockNestedInput
  }

  export type StockCreateWithoutAiChatLogsInput = {
    ticker: string
    name: string
    sector: string
    subSector: string
    pricePerShare?: number
    pricePerLot?: number
    marketCap: number
    marketCapLabel: string
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv?: number | null
    der?: number | null
    revenueLabel?: string | null
    netIncomeLabel?: string | null
    totalAssetsLabel?: string | null
    totalEquityLabel?: string | null
    period?: string
    lastUpdated?: string | null
    dataSource?: string | null
    dataStatus?: string | null
    hasData?: boolean
    description?: string | null
    ipoYear?: number | null
    listingBoard?: string | null
    controllingShareholder?: string | null
    controllingPercentage?: number | null
    publicShareholder?: string | null
    publicPercentage?: number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: number | null
    dividendPayoutRatio?: number | null
    dividendDateNote?: string | null
    netProfitMargin?: number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: string | null
    keyRisk?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aiInsights?: AiInsightCreateNestedManyWithoutStockInput
    lotSimulations?: LotSimulationCreateNestedManyWithoutStockInput
    watchlists?: WatchlistCreateNestedManyWithoutStockInput
  }

  export type StockUncheckedCreateWithoutAiChatLogsInput = {
    ticker: string
    name: string
    sector: string
    subSector: string
    pricePerShare?: number
    pricePerLot?: number
    marketCap: number
    marketCapLabel: string
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv?: number | null
    der?: number | null
    revenueLabel?: string | null
    netIncomeLabel?: string | null
    totalAssetsLabel?: string | null
    totalEquityLabel?: string | null
    period?: string
    lastUpdated?: string | null
    dataSource?: string | null
    dataStatus?: string | null
    hasData?: boolean
    description?: string | null
    ipoYear?: number | null
    listingBoard?: string | null
    controllingShareholder?: string | null
    controllingPercentage?: number | null
    publicShareholder?: string | null
    publicPercentage?: number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: number | null
    dividendPayoutRatio?: number | null
    dividendDateNote?: string | null
    netProfitMargin?: number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: string | null
    keyRisk?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aiInsights?: AiInsightUncheckedCreateNestedManyWithoutStockInput
    lotSimulations?: LotSimulationUncheckedCreateNestedManyWithoutStockInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutStockInput
  }

  export type StockCreateOrConnectWithoutAiChatLogsInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutAiChatLogsInput, StockUncheckedCreateWithoutAiChatLogsInput>
  }

  export type StockUpsertWithoutAiChatLogsInput = {
    update: XOR<StockUpdateWithoutAiChatLogsInput, StockUncheckedUpdateWithoutAiChatLogsInput>
    create: XOR<StockCreateWithoutAiChatLogsInput, StockUncheckedCreateWithoutAiChatLogsInput>
    where?: StockWhereInput
  }

  export type StockUpdateToOneWithWhereWithoutAiChatLogsInput = {
    where?: StockWhereInput
    data: XOR<StockUpdateWithoutAiChatLogsInput, StockUncheckedUpdateWithoutAiChatLogsInput>
  }

  export type StockUpdateWithoutAiChatLogsInput = {
    ticker?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    subSector?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    marketCapLabel?: StringFieldUpdateOperationsInput | string
    revenueGrowth?: FloatFieldUpdateOperationsInput | number
    netIncomeGrowth?: FloatFieldUpdateOperationsInput | number
    roe?: FloatFieldUpdateOperationsInput | number
    per?: FloatFieldUpdateOperationsInput | number
    pbv?: NullableFloatFieldUpdateOperationsInput | number | null
    der?: NullableFloatFieldUpdateOperationsInput | number | null
    revenueLabel?: NullableStringFieldUpdateOperationsInput | string | null
    netIncomeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalAssetsLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEquityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    period?: StringFieldUpdateOperationsInput | string
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: NullableStringFieldUpdateOperationsInput | string | null
    dataStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasData?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ipoYear?: NullableIntFieldUpdateOperationsInput | number | null
    listingBoard?: NullableStringFieldUpdateOperationsInput | string | null
    controllingShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    controllingPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    publicShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    publicPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendPayoutRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendDateNote?: NullableStringFieldUpdateOperationsInput | string | null
    netProfitMargin?: NullableFloatFieldUpdateOperationsInput | number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: NullableStringFieldUpdateOperationsInput | string | null
    keyRisk?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiInsights?: AiInsightUpdateManyWithoutStockNestedInput
    lotSimulations?: LotSimulationUpdateManyWithoutStockNestedInput
    watchlists?: WatchlistUpdateManyWithoutStockNestedInput
  }

  export type StockUncheckedUpdateWithoutAiChatLogsInput = {
    ticker?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    subSector?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    marketCapLabel?: StringFieldUpdateOperationsInput | string
    revenueGrowth?: FloatFieldUpdateOperationsInput | number
    netIncomeGrowth?: FloatFieldUpdateOperationsInput | number
    roe?: FloatFieldUpdateOperationsInput | number
    per?: FloatFieldUpdateOperationsInput | number
    pbv?: NullableFloatFieldUpdateOperationsInput | number | null
    der?: NullableFloatFieldUpdateOperationsInput | number | null
    revenueLabel?: NullableStringFieldUpdateOperationsInput | string | null
    netIncomeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalAssetsLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEquityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    period?: StringFieldUpdateOperationsInput | string
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: NullableStringFieldUpdateOperationsInput | string | null
    dataStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasData?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ipoYear?: NullableIntFieldUpdateOperationsInput | number | null
    listingBoard?: NullableStringFieldUpdateOperationsInput | string | null
    controllingShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    controllingPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    publicShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    publicPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendPayoutRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendDateNote?: NullableStringFieldUpdateOperationsInput | string | null
    netProfitMargin?: NullableFloatFieldUpdateOperationsInput | number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: NullableStringFieldUpdateOperationsInput | string | null
    keyRisk?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiInsights?: AiInsightUncheckedUpdateManyWithoutStockNestedInput
    lotSimulations?: LotSimulationUncheckedUpdateManyWithoutStockNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutStockNestedInput
  }

  export type StockCreateWithoutLotSimulationsInput = {
    ticker: string
    name: string
    sector: string
    subSector: string
    pricePerShare?: number
    pricePerLot?: number
    marketCap: number
    marketCapLabel: string
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv?: number | null
    der?: number | null
    revenueLabel?: string | null
    netIncomeLabel?: string | null
    totalAssetsLabel?: string | null
    totalEquityLabel?: string | null
    period?: string
    lastUpdated?: string | null
    dataSource?: string | null
    dataStatus?: string | null
    hasData?: boolean
    description?: string | null
    ipoYear?: number | null
    listingBoard?: string | null
    controllingShareholder?: string | null
    controllingPercentage?: number | null
    publicShareholder?: string | null
    publicPercentage?: number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: number | null
    dividendPayoutRatio?: number | null
    dividendDateNote?: string | null
    netProfitMargin?: number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: string | null
    keyRisk?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aiInsights?: AiInsightCreateNestedManyWithoutStockInput
    aiChatLogs?: AiChatLogCreateNestedManyWithoutStockInput
    watchlists?: WatchlistCreateNestedManyWithoutStockInput
  }

  export type StockUncheckedCreateWithoutLotSimulationsInput = {
    ticker: string
    name: string
    sector: string
    subSector: string
    pricePerShare?: number
    pricePerLot?: number
    marketCap: number
    marketCapLabel: string
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv?: number | null
    der?: number | null
    revenueLabel?: string | null
    netIncomeLabel?: string | null
    totalAssetsLabel?: string | null
    totalEquityLabel?: string | null
    period?: string
    lastUpdated?: string | null
    dataSource?: string | null
    dataStatus?: string | null
    hasData?: boolean
    description?: string | null
    ipoYear?: number | null
    listingBoard?: string | null
    controllingShareholder?: string | null
    controllingPercentage?: number | null
    publicShareholder?: string | null
    publicPercentage?: number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: number | null
    dividendPayoutRatio?: number | null
    dividendDateNote?: string | null
    netProfitMargin?: number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: string | null
    keyRisk?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aiInsights?: AiInsightUncheckedCreateNestedManyWithoutStockInput
    aiChatLogs?: AiChatLogUncheckedCreateNestedManyWithoutStockInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutStockInput
  }

  export type StockCreateOrConnectWithoutLotSimulationsInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutLotSimulationsInput, StockUncheckedCreateWithoutLotSimulationsInput>
  }

  export type StockUpsertWithoutLotSimulationsInput = {
    update: XOR<StockUpdateWithoutLotSimulationsInput, StockUncheckedUpdateWithoutLotSimulationsInput>
    create: XOR<StockCreateWithoutLotSimulationsInput, StockUncheckedCreateWithoutLotSimulationsInput>
    where?: StockWhereInput
  }

  export type StockUpdateToOneWithWhereWithoutLotSimulationsInput = {
    where?: StockWhereInput
    data: XOR<StockUpdateWithoutLotSimulationsInput, StockUncheckedUpdateWithoutLotSimulationsInput>
  }

  export type StockUpdateWithoutLotSimulationsInput = {
    ticker?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    subSector?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    marketCapLabel?: StringFieldUpdateOperationsInput | string
    revenueGrowth?: FloatFieldUpdateOperationsInput | number
    netIncomeGrowth?: FloatFieldUpdateOperationsInput | number
    roe?: FloatFieldUpdateOperationsInput | number
    per?: FloatFieldUpdateOperationsInput | number
    pbv?: NullableFloatFieldUpdateOperationsInput | number | null
    der?: NullableFloatFieldUpdateOperationsInput | number | null
    revenueLabel?: NullableStringFieldUpdateOperationsInput | string | null
    netIncomeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalAssetsLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEquityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    period?: StringFieldUpdateOperationsInput | string
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: NullableStringFieldUpdateOperationsInput | string | null
    dataStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasData?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ipoYear?: NullableIntFieldUpdateOperationsInput | number | null
    listingBoard?: NullableStringFieldUpdateOperationsInput | string | null
    controllingShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    controllingPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    publicShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    publicPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendPayoutRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendDateNote?: NullableStringFieldUpdateOperationsInput | string | null
    netProfitMargin?: NullableFloatFieldUpdateOperationsInput | number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: NullableStringFieldUpdateOperationsInput | string | null
    keyRisk?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiInsights?: AiInsightUpdateManyWithoutStockNestedInput
    aiChatLogs?: AiChatLogUpdateManyWithoutStockNestedInput
    watchlists?: WatchlistUpdateManyWithoutStockNestedInput
  }

  export type StockUncheckedUpdateWithoutLotSimulationsInput = {
    ticker?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    subSector?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    marketCapLabel?: StringFieldUpdateOperationsInput | string
    revenueGrowth?: FloatFieldUpdateOperationsInput | number
    netIncomeGrowth?: FloatFieldUpdateOperationsInput | number
    roe?: FloatFieldUpdateOperationsInput | number
    per?: FloatFieldUpdateOperationsInput | number
    pbv?: NullableFloatFieldUpdateOperationsInput | number | null
    der?: NullableFloatFieldUpdateOperationsInput | number | null
    revenueLabel?: NullableStringFieldUpdateOperationsInput | string | null
    netIncomeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalAssetsLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEquityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    period?: StringFieldUpdateOperationsInput | string
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: NullableStringFieldUpdateOperationsInput | string | null
    dataStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasData?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ipoYear?: NullableIntFieldUpdateOperationsInput | number | null
    listingBoard?: NullableStringFieldUpdateOperationsInput | string | null
    controllingShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    controllingPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    publicShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    publicPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendPayoutRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendDateNote?: NullableStringFieldUpdateOperationsInput | string | null
    netProfitMargin?: NullableFloatFieldUpdateOperationsInput | number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: NullableStringFieldUpdateOperationsInput | string | null
    keyRisk?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiInsights?: AiInsightUncheckedUpdateManyWithoutStockNestedInput
    aiChatLogs?: AiChatLogUncheckedUpdateManyWithoutStockNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutStockNestedInput
  }

  export type StockCreateWithoutWatchlistsInput = {
    ticker: string
    name: string
    sector: string
    subSector: string
    pricePerShare?: number
    pricePerLot?: number
    marketCap: number
    marketCapLabel: string
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv?: number | null
    der?: number | null
    revenueLabel?: string | null
    netIncomeLabel?: string | null
    totalAssetsLabel?: string | null
    totalEquityLabel?: string | null
    period?: string
    lastUpdated?: string | null
    dataSource?: string | null
    dataStatus?: string | null
    hasData?: boolean
    description?: string | null
    ipoYear?: number | null
    listingBoard?: string | null
    controllingShareholder?: string | null
    controllingPercentage?: number | null
    publicShareholder?: string | null
    publicPercentage?: number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: number | null
    dividendPayoutRatio?: number | null
    dividendDateNote?: string | null
    netProfitMargin?: number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: string | null
    keyRisk?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aiInsights?: AiInsightCreateNestedManyWithoutStockInput
    aiChatLogs?: AiChatLogCreateNestedManyWithoutStockInput
    lotSimulations?: LotSimulationCreateNestedManyWithoutStockInput
  }

  export type StockUncheckedCreateWithoutWatchlistsInput = {
    ticker: string
    name: string
    sector: string
    subSector: string
    pricePerShare?: number
    pricePerLot?: number
    marketCap: number
    marketCapLabel: string
    revenueGrowth: number
    netIncomeGrowth: number
    roe: number
    per: number
    pbv?: number | null
    der?: number | null
    revenueLabel?: string | null
    netIncomeLabel?: string | null
    totalAssetsLabel?: string | null
    totalEquityLabel?: string | null
    period?: string
    lastUpdated?: string | null
    dataSource?: string | null
    dataStatus?: string | null
    hasData?: boolean
    description?: string | null
    ipoYear?: number | null
    listingBoard?: string | null
    controllingShareholder?: string | null
    controllingPercentage?: number | null
    publicShareholder?: string | null
    publicPercentage?: number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: number | null
    dividendPayoutRatio?: number | null
    dividendDateNote?: string | null
    netProfitMargin?: number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: string | null
    keyRisk?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aiInsights?: AiInsightUncheckedCreateNestedManyWithoutStockInput
    aiChatLogs?: AiChatLogUncheckedCreateNestedManyWithoutStockInput
    lotSimulations?: LotSimulationUncheckedCreateNestedManyWithoutStockInput
  }

  export type StockCreateOrConnectWithoutWatchlistsInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutWatchlistsInput, StockUncheckedCreateWithoutWatchlistsInput>
  }

  export type StockUpsertWithoutWatchlistsInput = {
    update: XOR<StockUpdateWithoutWatchlistsInput, StockUncheckedUpdateWithoutWatchlistsInput>
    create: XOR<StockCreateWithoutWatchlistsInput, StockUncheckedCreateWithoutWatchlistsInput>
    where?: StockWhereInput
  }

  export type StockUpdateToOneWithWhereWithoutWatchlistsInput = {
    where?: StockWhereInput
    data: XOR<StockUpdateWithoutWatchlistsInput, StockUncheckedUpdateWithoutWatchlistsInput>
  }

  export type StockUpdateWithoutWatchlistsInput = {
    ticker?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    subSector?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    marketCapLabel?: StringFieldUpdateOperationsInput | string
    revenueGrowth?: FloatFieldUpdateOperationsInput | number
    netIncomeGrowth?: FloatFieldUpdateOperationsInput | number
    roe?: FloatFieldUpdateOperationsInput | number
    per?: FloatFieldUpdateOperationsInput | number
    pbv?: NullableFloatFieldUpdateOperationsInput | number | null
    der?: NullableFloatFieldUpdateOperationsInput | number | null
    revenueLabel?: NullableStringFieldUpdateOperationsInput | string | null
    netIncomeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalAssetsLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEquityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    period?: StringFieldUpdateOperationsInput | string
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: NullableStringFieldUpdateOperationsInput | string | null
    dataStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasData?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ipoYear?: NullableIntFieldUpdateOperationsInput | number | null
    listingBoard?: NullableStringFieldUpdateOperationsInput | string | null
    controllingShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    controllingPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    publicShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    publicPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendPayoutRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendDateNote?: NullableStringFieldUpdateOperationsInput | string | null
    netProfitMargin?: NullableFloatFieldUpdateOperationsInput | number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: NullableStringFieldUpdateOperationsInput | string | null
    keyRisk?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiInsights?: AiInsightUpdateManyWithoutStockNestedInput
    aiChatLogs?: AiChatLogUpdateManyWithoutStockNestedInput
    lotSimulations?: LotSimulationUpdateManyWithoutStockNestedInput
  }

  export type StockUncheckedUpdateWithoutWatchlistsInput = {
    ticker?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    subSector?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    marketCap?: FloatFieldUpdateOperationsInput | number
    marketCapLabel?: StringFieldUpdateOperationsInput | string
    revenueGrowth?: FloatFieldUpdateOperationsInput | number
    netIncomeGrowth?: FloatFieldUpdateOperationsInput | number
    roe?: FloatFieldUpdateOperationsInput | number
    per?: FloatFieldUpdateOperationsInput | number
    pbv?: NullableFloatFieldUpdateOperationsInput | number | null
    der?: NullableFloatFieldUpdateOperationsInput | number | null
    revenueLabel?: NullableStringFieldUpdateOperationsInput | string | null
    netIncomeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalAssetsLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEquityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    period?: StringFieldUpdateOperationsInput | string
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: NullableStringFieldUpdateOperationsInput | string | null
    dataStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasData?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ipoYear?: NullableIntFieldUpdateOperationsInput | number | null
    listingBoard?: NullableStringFieldUpdateOperationsInput | string | null
    controllingShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    controllingPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    publicShareholder?: NullableStringFieldUpdateOperationsInput | string | null
    publicPercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    businessSegments?: NullableJsonNullValueInput | InputJsonValue
    dividendYield?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendPayoutRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendDateNote?: NullableStringFieldUpdateOperationsInput | string | null
    netProfitMargin?: NullableFloatFieldUpdateOperationsInput | number | null
    sectorSpecificMetric?: NullableJsonNullValueInput | InputJsonValue
    keyMoat?: NullableStringFieldUpdateOperationsInput | string | null
    keyRisk?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiInsights?: AiInsightUncheckedUpdateManyWithoutStockNestedInput
    aiChatLogs?: AiChatLogUncheckedUpdateManyWithoutStockNestedInput
    lotSimulations?: LotSimulationUncheckedUpdateManyWithoutStockNestedInput
  }

  export type AiInsightCreateManyStockInput = {
    id?: string
    period?: string
    summary: string
    strengths: JsonNullValueInput | InputJsonValue
    considerations: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: string | null
    lastUpdated?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiChatLogCreateManyStockInput = {
    id?: string
    userEmail?: string
    sender?: string
    message: string
    period?: string | null
    createdAt?: Date | string
  }

  export type LotSimulationCreateManyStockInput = {
    id?: string
    pricePerShare: number
    pricePerLot: number
    targetBudget: number
    brokerFeePercent?: number
    calculatedLots: number
    totalStockCost: number
    brokerFeeAmount: number
    totalSpent: number
    remainingCash: number
    aiCommentary?: string | null
    createdAt?: Date | string
  }

  export type WatchlistCreateManyStockInput = {
    id?: string
    userEmail?: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type AiInsightUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: JsonNullValueInput | InputJsonValue
    considerations?: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiInsightUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: JsonNullValueInput | InputJsonValue
    considerations?: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiInsightUncheckedUpdateManyWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: JsonNullValueInput | InputJsonValue
    considerations?: JsonNullValueInput | InputJsonValue
    factPoints?: NullableJsonNullValueInput | InputJsonValue
    interpretationPoints?: NullableJsonNullValueInput | InputJsonValue
    disclaimer?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatLogUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    period?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatLogUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    period?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatLogUncheckedUpdateManyWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    period?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotSimulationUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    targetBudget?: FloatFieldUpdateOperationsInput | number
    brokerFeePercent?: FloatFieldUpdateOperationsInput | number
    calculatedLots?: IntFieldUpdateOperationsInput | number
    totalStockCost?: FloatFieldUpdateOperationsInput | number
    brokerFeeAmount?: FloatFieldUpdateOperationsInput | number
    totalSpent?: FloatFieldUpdateOperationsInput | number
    remainingCash?: FloatFieldUpdateOperationsInput | number
    aiCommentary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotSimulationUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    targetBudget?: FloatFieldUpdateOperationsInput | number
    brokerFeePercent?: FloatFieldUpdateOperationsInput | number
    calculatedLots?: IntFieldUpdateOperationsInput | number
    totalStockCost?: FloatFieldUpdateOperationsInput | number
    brokerFeeAmount?: FloatFieldUpdateOperationsInput | number
    totalSpent?: FloatFieldUpdateOperationsInput | number
    remainingCash?: FloatFieldUpdateOperationsInput | number
    aiCommentary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LotSimulationUncheckedUpdateManyWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricePerShare?: FloatFieldUpdateOperationsInput | number
    pricePerLot?: FloatFieldUpdateOperationsInput | number
    targetBudget?: FloatFieldUpdateOperationsInput | number
    brokerFeePercent?: FloatFieldUpdateOperationsInput | number
    calculatedLots?: IntFieldUpdateOperationsInput | number
    totalStockCost?: FloatFieldUpdateOperationsInput | number
    brokerFeeAmount?: FloatFieldUpdateOperationsInput | number
    totalSpent?: FloatFieldUpdateOperationsInput | number
    remainingCash?: FloatFieldUpdateOperationsInput | number
    aiCommentary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUncheckedUpdateManyWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}