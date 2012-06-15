-- Load records from the title-and-actor.txt file (tab separated).
file = LOAD '../data/director-and-title.txt' AS (director: chararray, title: chararray, year: int);
-- Group the lines by title.
file_grouped_by_director = GROUP file BY director;
-- Show a subset of the columns (title) in the output.
file_grouped_by_director_subset = FOREACH file_grouped_by_director GENERATE group, file.(title);
-- Output the result.
STORE file_grouped_by_director_subset INTO '../results/director-and-title_group-on-director';

