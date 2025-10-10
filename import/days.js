// maker-2.1.3.0.js
// LINE 158;
// h.prototype.onPaste = function(f, b) {
//     this.desc.type === e.type.activity ? g.importActivities(f, b, this.desc, this.mA) : (f = g.getImportedEntities(f, b, this.desc, this.grid, this.mA),
// DEBUGGER here: 0 !== f.entities.length && this.paste && this.paste(f))
// }

let globalTimetableObject = f.entities[0].parent;
globalTimetableObject.parent = globalTimetableObject;
f.entities = [
  {
    id: "4b501167-6af5-473b-920a-40a5117f6fa1",
    position: 1,
    name: "Понедельник",
    shortName: "Пн.",
    parent: globalTimetableObject,
  },
  {
    id: "75af6fe1-eb01-4c2e-9953-00356ddb2701",
    position: 2,
    name: "Вторник",
    shortName: "Вт.",
    parent: globalTimetableObject,
  },
  {
    id: "9b015eae-8f6d-43f7-8e53-388ed87b22ee",
    position: 3,
    name: "Среда",
    shortName: "Ср.",
    parent: globalTimetableObject,
  },
  {
    id: "c32dab86-2b53-4a80-b26c-5a35e5f3e6ac",
    position: 4,
    name: "Четверг",
    shortName: "Чт.",
    parent: globalTimetableObject,
  },
  {
    id: "fa5db463-4083-460e-8317-cb065ea13bf2",
    position: 5,
    name: "Пятница",
    shortName: "Пт.",
    parent: globalTimetableObject,
  },
];
