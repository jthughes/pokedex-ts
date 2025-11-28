type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalID: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  add<T>(key: string, val: T): void {
    this.#cache.set(key, { createdAt: Date.now(), val: val });
  }
  get<T>(key: string): any | undefined {
    const entry = this.#cache.get(key);
    if (entry != undefined) {
      return entry.val as T;
    }
    return undefined;
  }

  stopReapLoop() {
    if (this.#reapIntervalID) {
      clearInterval(this.#reapIntervalID);
      this.#reapIntervalID = undefined;
    }
  }
  #reap() {
    const now = Date.now();
    for (const [key, entry] of this.#cache.entries()) {
      if (entry.createdAt < now - this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalID = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }
}
