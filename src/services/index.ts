import { Application } from "../declarations";
import users from "./users/users.service";
import weapons from "./weapons/weapons.service";
import quests from "./quests/quests.service";
import events from "./events/events.service";
import runs from "./runs/runs.service";
// Don't remove this comment. It's needed to format import lines nicely.

export default function(app: Application) {
  app.configure(users);
  app.configure(weapons);
  app.configure(quests);
  app.configure(events);
  app.configure(runs);
}
