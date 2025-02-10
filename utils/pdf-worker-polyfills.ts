"use client";

function definePromiseWithResolvers(container: any) {
  container.Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

if (typeof Promise.withResolvers === "undefined") {
  if (typeof window !== "undefined") {
    definePromiseWithResolvers(window);
  } else {
    definePromiseWithResolvers(global);
  }
}
