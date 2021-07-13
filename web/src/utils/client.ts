// API Client
export class Client {
  items(cb) {
    return fetch("/morph/api/items");
  }
  inc(id: number) {
    return fetch(`/morph/api/inc/${id}`, { method: "POST" });
  }
  wip(id: number) {
    return fetch(`/morph/api/mv/${id}/WIP`, { method: "POST" });
  }
  todo(id: number) {
    return fetch(`/morph/api/mv/${id}/TODO`, { method: "POST" });
  }
  done(id: number) {
    return fetch(`/morph/api/mv/${id}/DONE`, { method: "POST" });
  }
  abort(id: number) {
    return fetch(`/morph/api/mv/${id}/ABORT`, { method: "POST" });
  }
  add(name: string) {
    return fetch(`/morph/api/new/${name}`, { method: "POST" });
  }
  undo() {
    return fetch(`/morph/api/undo`, { method: "PUT" });
  }
}
