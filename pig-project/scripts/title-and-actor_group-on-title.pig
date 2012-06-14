-- Load records from the title-and-actor.txt file (tab separated).
file = load '../data/title-and-actor.txt' as (title: chararray, actor: chararray, year_of_birth: int,role: chararray);
-- Group the lines by title.
file_grouped_by_title = group file by title;
-- Show a subset of the columns (actor, role) in the output.
--file_grouped_by_title_subset = foreach file_grouped_by_title generate file.actor, file.role;
-- Output the result.
store file_grouped_by_title into '../results/title-and-actor_group-on-title';

