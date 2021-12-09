const db = require('../database');
const log = require('../utils/logger');

(async () => {
    try {
        await db.sequelize.drop();
    
        log.info('DB droped');
    
        await db.sequelize.sync({ force: true });
    
        log.info('DB sync');
        
    } catch (error) {
        log.error(error);
    } finally{
        process.exit(0);
    }
})();