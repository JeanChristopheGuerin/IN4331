-- Load records from the title-and-actor.txt file (tab separated).
file1 = LOAD '../data/director-and-title.txt' AS (director: chararray, title: chararray, year: int);
-- Load records from the title-and-actor.txt file (tab separated).
file2 = LOAD '../data/title-and-actor.txt' AS (title: chararray, actor: chararray, year_of_birth: int,role: chararray);

-- Cogroup file1 and file2
cogrouped = COGROUP file1 BY title, file2 BY title;

-- Show a subset of the columns in the output.
cogrouped_subset = FOREACH cogrouped GENERATE group, file1.(director), file2.(actor, role);

-- Output the result.
STORE cogrouped_subset INTO '../results/director-title-actor_cogroup';

