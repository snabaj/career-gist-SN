import sequelize from '../config/connection.js';
import {User} from "./userModel";




// User.hasMany(Ticket, { foreignKey: 'assignedUserId' }); !EXAMPLE - not real code!
// Setup associations

// export User work and applications






export default { sequelize, User };
