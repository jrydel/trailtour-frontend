import React from 'react';
import LayoutPage, { PageHeader, PageTitle, PageContent } from '../LayoutPage';
import { useFetch, API_URL, defaultGetOptions } from '../utils/FetchUtils';
import { useSnackbar } from 'notistack';
import { Box, Typography, Paper } from '@material-ui/core';

const StageInfo = props => {

    const stageNumber = props.match.params.number;

    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    // api data
    const [trigger, setTrigger] = React.useState(false);
    const stageData = useFetch(
        API_URL + "/getStageInfo?database=trailtour_cz&number=" + stageNumber,
        defaultGetOptions,
        [trigger],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const pageLoading = stageData.loading;

    return (
        <LayoutPage pageLoading={pageLoading}>
            <PageHeader>
                <PageTitle>Informace</PageTitle>
            </PageHeader>
            <PageContent>
                {stageData.data.map((item, key1) =>
                    <Paper variant="outlined" square>
                        <Box style={{ padding: 20 }}>
                            <Typography gutterBottom variant="h5" component="h2" gutterBottom>
                                {item.title}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {item.content}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.created}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.author}
                            </Typography>
                        </Box>
                    </Paper>
                )}
            </PageContent>
        </LayoutPage >
    )
}

export default StageInfo;