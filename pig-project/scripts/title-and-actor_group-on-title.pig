-- Load records from the title-and-actor.txt file (tab separated).
file = LOAD '../data/title-and-actor.txt' AS (title: chararray, actor: chararray, year_of_birth: int,role: chararray);
-- Group the lines by title.
file_grouped_by_title = GROUP file BY title;
-- Show a subset of the columns (actor, role) in the output.
file_grouped_by_title_subset = FOREACH file_grouped_by_title GENERATE group, file.(actor, role);
-- Output the result.
STORE file_grouped_by_title_subset into '../results/title-and-actor_group-on-title';

