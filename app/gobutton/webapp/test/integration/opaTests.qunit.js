sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'gobutton/test/integration/FirstJourney',
		'gobutton/test/integration/pages/studList',
		'gobutton/test/integration/pages/studObjectPage'
    ],
    function(JourneyRunner, opaJourney, studList, studObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('gobutton') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThestudList: studList,
					onThestudObjectPage: studObjectPage
                }
            },
            opaJourney.run
        );
    }
);