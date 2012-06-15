-- Load records from the title-and-actor.txt file (tab separated).
file1 = LOAD '../data/director-and-title.txt' AS (director: chararray, title: chararray, year: int);
-- Load records from the title-and-actor.txt file (tab separated).
file2 = LOAD '../data/title-and-actor.txt' AS (title: chararray, actor: chararray, year_of_birth: int,role: chararray);

-- Cogroup file1 and file2
cogrouped = COGROUP file1 BY director, file2 BY actor;

-- Generate a subset of the columns in the output.
cogrouped_subset = FOREACH cogrouped GENERATE group, file2.(title), file1.(title);

-- Join both file1 and file2 over the title.
joined = JOIN file1 by title, file2 by title;

-- Take only the actor and director fields.
joined_subset = FOREACH joined GENERATE file1::director, file2::actor;

-- Filter out tuple for which the actor in not equal to the director.
joined_subset_filtered = FILTER joined_subset BY file1::director == file2::actor;

-- Take only the director name (equal to actor name).
actor_that_is_director = FOREACH joined_subset_filtered GENERATE file1::director;

-- Output the result.
STORE actor_that_is_director INTO '../results/actor_that_is_also_director_in_same_movie';
