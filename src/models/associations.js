// Models
import Students from "./Students.js";
import Photo from "./Photo.js";

export default function associateModels() {
  Students.hasMany(Photo, { foreignKey: "student_id", as: "photos" });
  Photo.belongsTo(Students, { foreignKey: "student_id", as: "students" });
}
