import {Grid, Typography} from "@mui/material";
import React from "react";

export default function OrderKitQuestions({questionaries}) {
	return (
		<Grid item container xs={12} p={3} columnSpacing={4}>
			<Grid item xs={12}>
				<Typography variant="h6" sx={{color: "text.disabled"}}>
					ADDITIONAL DETAILS
				</Typography>
			</Grid>
			{questionaries?.map(({_id, question: {question}, selectedAnswer, customAnswer}, index) => (
				<Grid
					item
					xs={12}
					md={6}
					sx={{
						pt: {xs: 2, sm: 6},
					}}
					key={_id}>
					<Typography
						sx={{
							fontSize: {xs: "1.2rem"},
							fontWeight: 700,
							mb: 1,
						}}>
						<span style={{color: "#ccc"}}>#{index + 1}</span>
						&nbsp;&nbsp;&nbsp;
						{question}
					</Typography>
					<Typography
						sx={{
							fontSize: {xs: "1rem"},
							fontWeight: 700,
							mb: 1,
						}}>
						<span style={{color: "#ccc"}}>Selected Answer</span>
						&nbsp;&nbsp;&nbsp;
						{selectedAnswer}
					</Typography>
					{customAnswer !== "" && (
						<Typography
							sx={{
								fontSize: {xs: "1rem"},
								fontWeight: 700,
								mb: 1,
							}}>
							<span style={{color: "#ccc"}}>Custom Answer</span>
							&nbsp;&nbsp;&nbsp;
							{customAnswer}
						</Typography>
					)}
				</Grid>
			))}
		</Grid>
	);
}
