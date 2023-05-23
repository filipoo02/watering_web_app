export abstract class PersistenceService {
  abstract setValue<T>(key: string, value: T): void;
  abstract getValue<T>(key: string): T | null;
  abstract deleteValue(key: string): void;
}
