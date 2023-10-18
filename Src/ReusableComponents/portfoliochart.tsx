import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import {
    LineChart,
} from "react-native-chart-kit";


interface portchartProp {

    symbol?: any,
    closeprice: any,
    time: any
    clock_flag?: any,
}

let label: any = [];
let value: any = [];

const PortfolioChart = (props: portchartProp) => {

    const ref = React.useRef();
    const [pos, setPos] = React.useState(0);
    const [scrollPosition, setScrollPosition] = React.useState(0)

    const chartConfig = {

        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.1,
        useShadowColorFromDataset: true, // optional
    }

    const PlotData = () => {

        var data = {
            labels: label,
            datasets: [
                {
                    data: value,
                    color: (opacity = 1) => `rgba(0, 98, 38, ${opacity})`, // optional
                    strokeWidth: 2 //optional
                }
            ],
            legend: ["Close price"] //optional
        };

        return (
            <>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {value.length > 0 ?
                        <LineChart
                            data={data}
                            width={label.length * 75}
                            height={260}
                            verticalLabelRotation={20}
                            chartConfig={chartConfig}
                            bezier
                        />
                        : null}
                </ScrollView>
            </>
        );
    };

    useEffect(() => {

        if (props.closeprice != [] && props.time != []) {
            label = props.time;
            value = props.closeprice;
            PlotData();
        }

    }, [props]);

    return (
        <>
            {
                props.closeprice != [] && props.time != [] ? (
                    <PlotData />
                ) : null
            }
        </>
    );
};

export default PortfolioChart;
