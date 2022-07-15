const DB = require('../models/index')

DB.sequelize.sync({force: true}).then(async function() {


    await DB.Band.create({
        name: 'test_band_1',
        genre: 'super cool',
        // available_start_time: '2023-05-30 17:00:00',
        // end_time: '2023-05-30 20:00:00'
    }, {
        name: 'test_band_2',
        genre: 'cool cool',
        // available_start_time: '2023-06-30 17:00:00',
        // end_time: '2023-06-30 20:00:00'
    }    
    )

    await DB.Event.create({
        name: 'Lollapalooza'
    },
    {
        name: 'Fall Fest'        
    })

    await DB.MeetGreet.create({
        event_id: 1,
        band_id: 1
    },
    {
        event_id: 2,
        band_id: 2       
    })
    
    await DB.Stage.create({
        name: 'Main'
    })

    await DB.StageEvent.create({
        stage_id: 1,
        event_id: 1
    }, {
        stage_id: 2,
        event_id: 2
    }
    )
    
    await DB.SetTime.create({
        event_id: 1,
        stage_id: 1,
        band_id: 1
    },
    {
        event_id: 2,
        stage_id: 2,
        band_id: 2 
    })

})