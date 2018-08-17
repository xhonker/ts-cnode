export function home() {
  return "/";
}

export function details(topic: string) {
  return `/details/${topic}`;
}

export function user(loginname: string) {
  return `/user/${loginname}`;
}

export function edit() {
  return "/edit";
}
