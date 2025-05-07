// Models
import Students from "./Students.js";
import Photo from "./Photo.js";

export default function associateModels() {
  Students.hasMany(Photo, { foreignKey: "student_id" });
  Photo.belongsTo(Students, { foreignKey: "student_id" });
}
