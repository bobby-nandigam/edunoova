// Rich topic content for each subject's topics
// Each topic has: title, theory, keyPoints, codeExample, handsOn exercises

export type TopicContent = {
  title: string;
  theory: string;
  keyPoints: string[];
  codeExample?: { language: string; code: string; explanation: string };
  handsOn: { task: string; hint: string }[];
};

type SubjectTopicContent = Record<string, TopicContent[]>;

export const topicContent: SubjectTopicContent = {
  "data-structures-algorithms": [
    {
      title: "Arrays & Strings",
      theory: "Arrays are contiguous memory blocks storing elements of the same type. They provide O(1) random access via indexing but O(n) insertion/deletion in the worst case. Strings are essentially character arrays with special operations like concatenation, substring search, and pattern matching.\n\nArrays form the backbone of most algorithms. Understanding how memory layout affects cache performance is critical for writing efficient code. Multi-dimensional arrays, dynamic arrays (like vectors in C++ or ArrayList in Java), and string manipulation techniques are foundational skills.",
      keyPoints: [
        "O(1) access by index, O(n) search in unsorted arrays",
        "Dynamic arrays double capacity when full (amortized O(1) append)",
        "Strings are immutable in Java/Python — concatenation creates new objects",
        "Two-pointer and sliding window are key array techniques",
        "Prefix sums enable O(1) range queries after O(n) preprocessing"
      ],
      codeExample: {
        language: "python",
        code: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Example
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`,
        explanation: "Classic Two Sum using a hash map for O(n) time complexity instead of O(n²) brute force."
      },
      handsOn: [
        { task: "Implement a function to reverse a string in-place without using extra space.", hint: "Use two pointers — one at the start and one at the end." },
        { task: "Find the maximum subarray sum using Kadane's algorithm.", hint: "Track current_max and global_max while iterating." },
        { task: "Check if two strings are anagrams of each other.", hint: "Use a frequency counter (hash map) or sort both strings." }
      ]
    },
    {
      title: "Linked Lists",
      theory: "A linked list is a linear data structure where each element (node) contains data and a pointer to the next node. Unlike arrays, linked lists don't require contiguous memory, making insertions and deletions O(1) at known positions.\n\nSingly linked lists have nodes pointing in one direction; doubly linked lists allow traversal both ways. Circular linked lists connect the last node back to the first. Understanding pointer manipulation is crucial for linked list problems.",
      keyPoints: [
        "O(1) insertion/deletion at head; O(n) at arbitrary positions",
        "No random access — must traverse from head",
        "Uses more memory than arrays due to pointer storage",
        "Runner (fast/slow pointer) technique detects cycles",
        "Sentinel/dummy nodes simplify edge cases"
      ],
      codeExample: {
        language: "python",
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`,
        explanation: "Iterative reversal of a singly linked list using three pointers."
      },
      handsOn: [
        { task: "Detect if a linked list has a cycle using Floyd's algorithm.", hint: "Use slow (1 step) and fast (2 steps) pointers." },
        { task: "Merge two sorted linked lists into one sorted list.", hint: "Compare heads of both lists and build result iteratively." },
        { task: "Find the middle element of a linked list in one pass.", hint: "Use the slow/fast pointer technique." }
      ]
    },
    {
      title: "Stacks & Queues",
      theory: "Stacks follow Last-In-First-Out (LIFO) order — the most recently added element is removed first. Queues follow First-In-First-Out (FIFO) order. Both are fundamental abstract data types used extensively in algorithms.\n\nStacks are used in function call management, expression evaluation, and backtracking. Queues power BFS traversals, scheduling algorithms, and buffering. Deques (double-ended queues) support operations at both ends.",
      keyPoints: [
        "Stack: push, pop, peek — all O(1)",
        "Queue: enqueue, dequeue, front — all O(1) with proper implementation",
        "Monotonic stacks solve 'next greater element' type problems",
        "Priority queues (heaps) are specialized queues",
        "Implement queue using two stacks and vice versa"
      ],
      codeExample: {
        language: "python",
        code: `def is_valid_parentheses(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack

print(is_valid_parentheses("({[]})"))  # True`,
        explanation: "Valid parentheses checker using a stack — a classic interview question."
      },
      handsOn: [
        { task: "Implement a MinStack that supports push, pop, top, and getMin in O(1).", hint: "Use an auxiliary stack to track minimums." },
        { task: "Implement a queue using two stacks.", hint: "Use one stack for enqueue and another for dequeue operations." },
        { task: "Evaluate a postfix expression using a stack.", hint: "Push operands; on operator, pop two operands and push result." }
      ]
    },
    {
      title: "Trees & BST",
      theory: "Trees are hierarchical data structures with a root node and child nodes forming a parent-child relationship. Binary trees have at most two children per node. Binary Search Trees (BSTs) maintain the property that left children are smaller and right children are larger than the parent.\n\nTree traversals (inorder, preorder, postorder, level-order) are fundamental operations. Balanced BSTs like AVL trees and Red-Black trees guarantee O(log n) operations. Trees model file systems, organizational hierarchies, and decision-making processes.",
      keyPoints: [
        "BST search, insert, delete: O(h) where h = height",
        "Balanced BST: h = O(log n); skewed BST: h = O(n)",
        "Inorder traversal of BST gives sorted output",
        "DFS uses stack (recursion); BFS uses queue",
        "Lowest Common Ancestor (LCA) is a frequent interview topic"
      ],
      codeExample: {
        language: "python",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
        explanation: "Inorder traversal and max depth calculation — two fundamental tree operations."
      },
      handsOn: [
        { task: "Check if a binary tree is a valid BST.", hint: "Use inorder traversal and verify sorted order, or use min/max bounds." },
        { task: "Find the lowest common ancestor of two nodes in a BST.", hint: "If both nodes are smaller, go left; if both larger, go right." },
        { task: "Serialize and deserialize a binary tree.", hint: "Use preorder traversal with null markers." }
      ]
    },
    {
      title: "Graphs",
      theory: "Graphs consist of vertices (nodes) connected by edges. They can be directed or undirected, weighted or unweighted. Graphs model networks, social connections, maps, and dependencies.\n\nGraph representations include adjacency matrix (O(V²) space) and adjacency list (O(V+E) space). Key algorithms include BFS for shortest path in unweighted graphs, DFS for cycle detection and topological sorting, Dijkstra's for weighted shortest path, and minimum spanning tree algorithms (Kruskal's, Prim's).",
      keyPoints: [
        "BFS: O(V+E), finds shortest path in unweighted graphs",
        "DFS: O(V+E), used for cycle detection and topological sort",
        "Dijkstra's: O((V+E) log V) with min-heap",
        "Topological sort works only on DAGs",
        "Union-Find is efficient for connected components"
      ],
      codeExample: {
        language: "python",
        code: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order

graph = {0: [1, 2], 1: [0, 3], 2: [0], 3: [1]}
print(bfs(graph, 0))  # [0, 1, 2, 3]`,
        explanation: "BFS traversal using a queue — foundation for shortest path algorithms."
      },
      handsOn: [
        { task: "Detect a cycle in a directed graph using DFS.", hint: "Track nodes in the current recursion stack." },
        { task: "Implement topological sort for a DAG.", hint: "Use DFS with a stack to record finish order." },
        { task: "Find the number of connected components in an undirected graph.", hint: "Run BFS/DFS from each unvisited node." }
      ]
    },
    {
      title: "Hashing",
      theory: "Hashing maps data to fixed-size values using hash functions, enabling O(1) average-case lookups, insertions, and deletions. Hash tables (dictionaries/maps) are the primary data structure using hashing.\n\nCollision resolution strategies include chaining (linked lists at each bucket) and open addressing (linear probing, quadratic probing, double hashing). A good hash function distributes keys uniformly. Load factor affects performance — most implementations resize when load factor exceeds a threshold.",
      keyPoints: [
        "Average O(1) for insert, delete, search",
        "Worst case O(n) with many collisions",
        "Hash sets store unique elements; hash maps store key-value pairs",
        "Rolling hash enables O(n) string matching (Rabin-Karp)",
        "Consistent hashing is used in distributed systems"
      ],
      codeExample: {
        language: "python",
        code: `def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = tuple(sorted(s))
        groups.setdefault(key, []).append(s)
    return list(groups.values())

print(group_anagrams(["eat","tea","tan","ate","nat","bat"]))
# [['eat','tea','ate'], ['tan','nat'], ['bat']]`,
        explanation: "Group anagrams using sorted string as hash key — demonstrates practical hashing."
      },
      handsOn: [
        { task: "Find the first non-repeating character in a string.", hint: "Use a hash map to count frequencies, then scan again." },
        { task: "Implement an LRU Cache using a hash map and doubly linked list.", hint: "Map stores keys to nodes; list maintains access order." },
        { task: "Check if any two elements in an array sum to a target.", hint: "Use a set to store complements as you iterate." }
      ]
    },
    {
      title: "Heaps",
      theory: "A heap is a complete binary tree satisfying the heap property: in a max-heap, each parent is greater than or equal to its children; in a min-heap, each parent is less than or equal to its children. Heaps are typically implemented using arrays.\n\nThe primary operations are insert (O(log n)) and extract-min/max (O(log n)). Heaps power priority queues, which are used in Dijkstra's algorithm, job scheduling, and finding the Kth largest/smallest elements. Heapify converts an array to a heap in O(n) time.",
      keyPoints: [
        "Insert and extract: O(log n)",
        "Build heap from array: O(n) using bottom-up heapify",
        "Parent at index i; children at 2i+1 and 2i+2",
        "Min-heap: root is the smallest element",
        "Used in heap sort: O(n log n), not stable"
      ],
      codeExample: {
        language: "python",
        code: `import heapq

def find_kth_largest(nums, k):
    # Use a min-heap of size k
    heap = nums[:k]
    heapq.heapify(heap)
    for num in nums[k:]:
        if num > heap[0]:
            heapq.heapreplace(heap, num)
    return heap[0]

print(find_kth_largest([3,2,1,5,6,4], 2))  # 5`,
        explanation: "Finding the Kth largest element using a min-heap of size K — O(n log k) time."
      },
      handsOn: [
        { task: "Merge K sorted arrays using a min-heap.", hint: "Push the first element of each array, then extract-min and push next." },
        { task: "Implement a max-heap from scratch with insert and extract-max.", hint: "Use an array; bubble up on insert, bubble down on extract." },
        { task: "Find the median from a data stream.", hint: "Use two heaps: max-heap for lower half, min-heap for upper half." }
      ]
    },
    {
      title: "Sorting Algorithms",
      theory: "Sorting arranges elements in a specific order. Comparison-based sorts have a lower bound of O(n log n). Key algorithms include:\n\n• Bubble Sort: O(n²) — simple but inefficient, swaps adjacent elements\n• Selection Sort: O(n²) — finds min and places it in position\n• Insertion Sort: O(n²) — efficient for nearly sorted data\n• Merge Sort: O(n log n) — stable, divide-and-conquer, uses extra space\n• Quick Sort: O(n log n) average — in-place, but O(n²) worst case\n• Heap Sort: O(n log n) — in-place but not stable\n\nNon-comparison sorts like Counting Sort, Radix Sort, and Bucket Sort can achieve O(n) for specific data distributions.",
      keyPoints: [
        "Merge Sort: stable, O(n log n), O(n) extra space",
        "Quick Sort: in-place, O(n log n) average, pivot selection matters",
        "Counting Sort: O(n+k), works for integers in known range",
        "Stability matters when sorting by multiple keys",
        "Tim Sort (Python/Java default) combines merge sort and insertion sort"
      ],
      codeExample: {
        language: "python",
        code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
        explanation: "Merge Sort — a stable O(n log n) divide-and-conquer sorting algorithm."
      },
      handsOn: [
        { task: "Implement Quick Sort with random pivot selection.", hint: "Swap a random element with the last, then partition." },
        { task: "Sort an array of 0s, 1s, and 2s in one pass (Dutch National Flag).", hint: "Use three pointers: low, mid, high." },
        { task: "Count the number of inversions in an array using merge sort.", hint: "Count when right element is smaller during merge step." }
      ]
    },
    {
      title: "Searching Algorithms",
      theory: "Searching algorithms find target elements in data structures. Linear search checks every element (O(n)), while binary search works on sorted data in O(log n) by repeatedly halving the search space.\n\nBinary search extends beyond simple lookup — it can find insertion points, first/last occurrences, and solve optimization problems (binary search on answer). Interpolation search improves over binary search for uniformly distributed data. Hash-based search achieves O(1) average time.",
      keyPoints: [
        "Binary Search: O(log n) on sorted arrays",
        "Watch for integer overflow: use mid = low + (high - low) // 2",
        "Binary search on answer: apply to optimization problems",
        "Lower bound / upper bound variations are crucial",
        "Ternary search works on unimodal functions"
      ],
      codeExample: {
        language: "python",
        code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

def first_occurrence(arr, target):
    low, high, result = 0, len(arr) - 1, -1
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            result = mid
            high = mid - 1  # keep searching left
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return result`,
        explanation: "Standard binary search and finding first occurrence — key variations."
      },
      handsOn: [
        { task: "Find the square root of a number using binary search (integer part).", hint: "Search in range [0, n] where mid*mid <= n." },
        { task: "Search in a rotated sorted array.", hint: "Determine which half is sorted, then decide which half to search." },
        { task: "Find peak element in an array.", hint: "Use binary search — compare mid with its neighbors." }
      ]
    },
    {
      title: "Dynamic Programming",
      theory: "Dynamic Programming (DP) solves complex problems by breaking them into overlapping subproblems and storing results to avoid recomputation. It applies when a problem has optimal substructure (optimal solution built from optimal solutions of subproblems) and overlapping subproblems.\n\nTwo approaches: top-down (memoization with recursion) and bottom-up (tabulation with iteration). Common DP patterns include 0/1 Knapsack, Longest Common Subsequence, Matrix Chain Multiplication, and state machine DP. Mastering DP requires extensive practice.",
      keyPoints: [
        "Identify state, transition, base case",
        "Top-down: easier to write; bottom-up: usually faster",
        "Space optimization: often reduce 2D DP to 1D",
        "Common patterns: knapsack, LCS, LIS, grid paths, intervals",
        "DP on trees, digits, bitmasks for advanced problems"
      ],
      codeExample: {
        language: "python",
        code: `def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

print(longest_common_subsequence("abcde", "ace"))  # 3`,
        explanation: "LCS — a classic 2D DP problem. Build the table bottom-up comparing characters."
      },
      handsOn: [
        { task: "Solve the 0/1 Knapsack problem.", hint: "State: dp[i][w] = max value using first i items with capacity w." },
        { task: "Find the longest increasing subsequence (LIS).", hint: "O(n²) DP or O(n log n) with binary search + patience sorting." },
        { task: "Count unique paths in a grid from top-left to bottom-right.", hint: "dp[i][j] = dp[i-1][j] + dp[i][j-1]" }
      ]
    },
    {
      title: "Greedy Algorithms",
      theory: "Greedy algorithms make the locally optimal choice at each step, hoping it leads to a globally optimal solution. Unlike DP, greedy doesn't reconsider choices. It works when the problem has the greedy choice property and optimal substructure.\n\nClassic greedy problems include Activity Selection, Huffman Coding, Fractional Knapsack, and Minimum Spanning Trees (Kruskal's, Prim's). Proving greedy correctness often involves exchange arguments or showing that the greedy stays ahead.",
      keyPoints: [
        "Make the best local choice at each step",
        "Works when greedy choice property holds",
        "Typically simpler and faster than DP",
        "Sorting is often a preprocessing step",
        "Proof techniques: exchange argument, greedy stays ahead"
      ],
      codeExample: {
        language: "python",
        code: `def activity_selection(activities):
    # Sort by end time
    activities.sort(key=lambda x: x[1])
    selected = [activities[0]]
    for i in range(1, len(activities)):
        if activities[i][0] >= selected[-1][1]:
            selected.append(activities[i])
    return selected

activities = [(1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11)]
print(activity_selection(activities))`,
        explanation: "Activity Selection — sort by end time and greedily pick non-overlapping activities."
      },
      handsOn: [
        { task: "Solve the fractional knapsack problem.", hint: "Sort by value/weight ratio, take as much as possible." },
        { task: "Find minimum number of platforms needed at a railway station.", hint: "Sort arrivals and departures, use two pointers." },
        { task: "Assign minimum number of meeting rooms (interval partitioning).", hint: "Sort by start time, use a min-heap to track end times." }
      ]
    },
    {
      title: "Backtracking",
      theory: "Backtracking is a systematic way of exploring all possible configurations of a search space by building candidates incrementally and abandoning (backtracking) candidates that cannot lead to valid solutions. It's essentially DFS with pruning.\n\nBacktracking is used for constraint satisfaction problems like N-Queens, Sudoku Solver, generating permutations/combinations, and graph coloring. The key optimization is pruning — cutting branches early when constraints are violated.",
      keyPoints: [
        "Build solution incrementally, undo choices that fail",
        "Time complexity often exponential but pruning helps",
        "Template: choose → explore → unchoose",
        "Used for permutations, combinations, subsets",
        "Constraint propagation enhances pruning"
      ],
      codeExample: {
        language: "python",
        code: `def permutations(nums):
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return
        for i in range(len(remaining)):
            path.append(remaining[i])
            backtrack(path, remaining[:i] + remaining[i+1:])
            path.pop()  # backtrack
    backtrack([], nums)
    return result

print(permutations([1, 2, 3]))`,
        explanation: "Generate all permutations using the choose-explore-unchoose backtracking pattern."
      },
      handsOn: [
        { task: "Solve the N-Queens problem for N=8.", hint: "Place queens row by row; check column and diagonal conflicts." },
        { task: "Generate all valid combinations of n pairs of parentheses.", hint: "Track open and close counts; only add close if close < open." },
        { task: "Solve a Sudoku puzzle.", hint: "Try digits 1-9 in empty cells; backtrack on conflicts." }
      ]
    },
    {
      title: "Divide & Conquer",
      theory: "Divide and Conquer breaks a problem into smaller subproblems of the same type, solves them recursively, and combines results. It's the foundation of algorithms like Merge Sort, Quick Sort, and Binary Search.\n\nThe Master Theorem provides time complexity analysis for divide-and-conquer recurrences of the form T(n) = aT(n/b) + O(n^d). Key applications include Strassen's Matrix Multiplication, Closest Pair of Points, and Karatsuba Multiplication.",
      keyPoints: [
        "Three steps: Divide, Conquer, Combine",
        "Master Theorem: T(n) = aT(n/b) + O(n^d)",
        "Merge Sort is the classic D&C example",
        "Often leads to O(n log n) algorithms",
        "Recursion tree helps visualize complexity"
      ],
      codeExample: {
        language: "python",
        code: `def max_subarray_dc(nums, low, high):
    if low == high:
        return nums[low]
    mid = (low + high) // 2
    left_max = max_subarray_dc(nums, low, mid)
    right_max = max_subarray_dc(nums, mid + 1, high)
    # Find max crossing subarray
    left_sum = float('-inf')
    total = 0
    for i in range(mid, low - 1, -1):
        total += nums[i]
        left_sum = max(left_sum, total)
    right_sum = float('-inf')
    total = 0
    for i in range(mid + 1, high + 1):
        total += nums[i]
        right_sum = max(right_sum, total)
    cross_max = left_sum + right_sum
    return max(left_max, right_max, cross_max)`,
        explanation: "Maximum subarray using divide and conquer — O(n log n) approach."
      },
      handsOn: [
        { task: "Implement power(x, n) using divide and conquer in O(log n).", hint: "x^n = (x^(n/2))^2 for even n." },
        { task: "Find the closest pair of points in a 2D plane.", hint: "Sort by x, divide into halves, combine by checking strip." },
        { task: "Count inversions in an array using modified merge sort.", hint: "During merge, count when right element comes first." }
      ]
    },
    {
      title: "Time & Space Complexity",
      theory: "Complexity analysis measures how an algorithm's resource usage (time or space) grows with input size. Big-O notation describes the upper bound (worst case), Big-Omega the lower bound, and Big-Theta the tight bound.\n\nCommon complexities ranked: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!). Amortized analysis accounts for occasional expensive operations (like dynamic array resizing). Space complexity includes both auxiliary space and input space.",
      keyPoints: [
        "Big-O: worst case upper bound",
        "Drop constants and lower-order terms",
        "Nested loops often indicate O(n²) or higher",
        "Recursive algorithms: use recurrence relations",
        "Amortized analysis for dynamic structures"
      ],
      codeExample: {
        language: "python",
        code: `# O(1) - Constant
def get_first(arr): return arr[0]

# O(log n) - Logarithmic (binary search)
def binary_search(arr, target): ...

# O(n) - Linear
def find_max(arr): return max(arr)

# O(n log n) - Linearithmic (merge sort)
def sort_array(arr): return sorted(arr)

# O(n²) - Quadratic
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr)-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

# O(2^n) - Exponential
def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)`,
        explanation: "Examples of each major complexity class — recognize these patterns in your code."
      },
      handsOn: [
        { task: "Analyze the time complexity of a given nested loop structure.", hint: "Count iterations of each loop; multiply for nested loops." },
        { task: "Optimize a brute-force O(n³) solution to O(n²) or O(n log n).", hint: "Look for redundant computations you can cache or precompute." },
        { task: "Determine the space complexity of a recursive Fibonacci vs. iterative version.", hint: "Recursive uses O(n) call stack; iterative uses O(1)." }
      ]
    }
  ],
  "operating-systems": [
    { title: "Process Management", theory: "A process is a program in execution. The OS manages processes through creation (fork), termination, and scheduling. Each process has its own address space, program counter, registers, and stack.\n\nProcess states include: New, Ready, Running, Waiting, and Terminated. The Process Control Block (PCB) stores all information about a process. Context switching saves and restores process state when the CPU switches between processes.", keyPoints: ["Process states: New → Ready → Running → Waiting → Terminated", "PCB stores PID, state, registers, memory info", "Fork creates child process; exec replaces process image", "Context switch overhead affects system performance", "Orphan and zombie processes need proper handling"], codeExample: { language: "c", code: `#include <stdio.h>\n#include <unistd.h>\n\nint main() {\n    pid_t pid = fork();\n    if (pid == 0) {\n        printf("Child PID: %d\\n", getpid());\n    } else {\n        printf("Parent PID: %d, Child: %d\\n", getpid(), pid);\n        wait(NULL);\n    }\n    return 0;\n}`, explanation: "Creating a child process using fork() — fundamental OS concept." }, handsOn: [{ task: "Write a program that creates a process tree of depth 3.", hint: "Each process forks once; control depth with a counter." }, { task: "Demonstrate the difference between fork() and exec().", hint: "Fork duplicates; exec replaces the process image." }] },
    { title: "Threads & Concurrency", theory: "Threads are lightweight processes sharing the same address space. Multi-threading enables parallelism within a process. Synchronization mechanisms (mutexes, semaphores, monitors) prevent race conditions.\n\nConcurrency issues include race conditions, deadlocks, and starvation. The critical section problem requires mutual exclusion, progress, and bounded waiting. Producer-consumer and readers-writers are classic synchronization problems.", keyPoints: ["Threads share code, data, files; have own stack and registers", "Mutex: binary lock for mutual exclusion", "Semaphore: counting mechanism for resource access", "Race condition: outcome depends on execution order", "Thread pools reduce creation overhead"], codeExample: { language: "python", code: `import threading\n\ncounter = 0\nlock = threading.Lock()\n\ndef increment():\n    global counter\n    for _ in range(100000):\n        with lock:\n            counter += 1\n\nt1 = threading.Thread(target=increment)\nt2 = threading.Thread(target=increment)\nt1.start(); t2.start()\nt1.join(); t2.join()\nprint(counter)  # 200000 (correct with lock)`, explanation: "Thread synchronization using a lock to prevent race conditions." }, handsOn: [{ task: "Implement the producer-consumer problem using semaphores.", hint: "Use one semaphore for empty slots, one for full slots, one mutex." }, { task: "Create a thread-safe singleton pattern.", hint: "Use double-checked locking with a lock." }] },
    { title: "CPU Scheduling", theory: "CPU scheduling decides which ready process gets the CPU next. The goal is to maximize CPU utilization, throughput, and minimize waiting time, turnaround time, and response time.\n\nAlgorithms: FCFS (simple but convoy effect), SJF (optimal average wait but needs burst prediction), Round Robin (fair, uses time quantum), Priority Scheduling (starvation possible, solved by aging), Multilevel Feedback Queue (most sophisticated).", keyPoints: ["FCFS: simple, non-preemptive, convoy effect", "SJF: optimal average wait time, hard to predict burst", "Round Robin: fair, time quantum affects performance", "Priority: may cause starvation, use aging", "Multilevel Feedback Queue: most general approach"], handsOn: [{ task: "Simulate Round Robin scheduling and calculate average waiting time.", hint: "Use a queue; process runs for min(burst, quantum) each turn." }, { task: "Compare FCFS vs SJF for a given set of processes.", hint: "Calculate waiting time and turnaround time for both." }] },
    { title: "Deadlocks", theory: "Deadlock occurs when processes are waiting for resources held by each other, creating a circular wait. Four necessary conditions: mutual exclusion, hold and wait, no preemption, and circular wait.\n\nStrategies: Prevention (eliminate one condition), Avoidance (Banker's algorithm), Detection (resource allocation graph), Recovery (kill process or preempt resource).", keyPoints: ["Four conditions must ALL hold for deadlock", "Banker's algorithm: safe state = no deadlock possible", "Resource Allocation Graph detects deadlocks", "Prevention: break at least one condition", "Ostrich algorithm: ignore (used by most OSes)"], handsOn: [{ task: "Implement Banker's algorithm to check if a state is safe.", hint: "Find a process whose needs can be met, simulate its completion, repeat." }, { task: "Draw a resource allocation graph and detect cycles.", hint: "Cycle in the graph with single-instance resources means deadlock." }] },
    { title: "Memory Management", theory: "Memory management allocates and deallocates memory for processes. Techniques include contiguous allocation (fixed/variable partitions), paging (fixed-size blocks), and segmentation (logical divisions).\n\nPaging eliminates external fragmentation but may have internal fragmentation. Page tables map virtual to physical addresses. Multi-level page tables and TLB (Translation Lookaside Buffer) optimize address translation.", keyPoints: ["Paging: fixed-size pages eliminate external fragmentation", "Page table maps virtual page → physical frame", "TLB: cache for recent page table entries", "Internal fragmentation: wasted space within allocated block", "External fragmentation: scattered free memory"], handsOn: [{ task: "Calculate physical address from virtual address given page size and table.", hint: "Virtual address = page number + offset; look up frame in page table." }, { task: "Simulate first-fit, best-fit, and worst-fit memory allocation.", hint: "First-fit: first hole that fits; best-fit: smallest adequate hole." }] },
    { title: "Virtual Memory", theory: "Virtual memory allows processes to use more memory than physically available by using disk as backing store. Demand paging loads pages only when accessed (page fault). Page replacement algorithms decide which page to evict.\n\nAlgorithms: FIFO (simple, Belady's anomaly), LRU (good but expensive), Optimal (theoretical best), Clock (practical approximation of LRU). Thrashing occurs when the system spends more time paging than executing.", keyPoints: ["Demand paging: load pages on access, not in advance", "Page fault: requested page not in memory", "LRU: replace least recently used page", "Thrashing: excessive paging, low CPU utilization", "Working set model prevents thrashing"], handsOn: [{ task: "Simulate LRU page replacement and count page faults.", hint: "Use a list/deque to track order; remove least recent on fault." }, { task: "Compare FIFO vs LRU vs Optimal for a reference string.", hint: "Track frames and count faults for each algorithm." }] },
    { title: "File Systems", theory: "File systems organize data on storage devices. They manage file naming, access methods, directory structures, and space allocation. Key concepts include inodes (metadata), directory structures, and allocation methods.\n\nAllocation methods: Contiguous (fast but fragmentation), Linked (no fragmentation but slow random access), Indexed (inode-based, used by Unix/ext4). Journaling file systems (ext4, NTFS) maintain consistency by logging changes.", keyPoints: ["Inode: stores metadata (permissions, size, block pointers)", "Directory: maps filenames to inodes", "Contiguous, linked, indexed allocation methods", "Journaling prevents corruption on crashes", "FAT, ext4, NTFS are common file systems"], handsOn: [{ task: "Calculate disk block access time for different allocation methods.", hint: "Contiguous: 1 access; Linked: traverse chain; Indexed: 2 accesses." }, { task: "Implement a simple in-memory file system with create, read, write, delete.", hint: "Use a dictionary for directories and byte arrays for file content." }] },
    { title: "I/O Systems", theory: "I/O systems manage communication between the CPU and peripheral devices. Key concepts include device drivers, interrupt handling, DMA (Direct Memory Access), and I/O scheduling.\n\nI/O can be programmed (polling), interrupt-driven, or DMA-based. Disk scheduling algorithms (FCFS, SSTF, SCAN, C-SCAN) optimize seek time. Buffering, caching, and spooling improve I/O performance.", keyPoints: ["DMA: device transfers data directly to memory", "Interrupt-driven I/O frees CPU during transfer", "Disk scheduling: SSTF minimizes seek time", "SCAN (elevator): moves in one direction, then reverses", "Buffering smooths speed differences"], handsOn: [{ task: "Simulate SCAN and C-SCAN disk scheduling algorithms.", hint: "Sort requests; serve in one direction, then reverse (SCAN) or jump back (C-SCAN)." }] },
    { title: "System Calls", theory: "System calls provide the interface between user programs and the OS kernel. They enable processes to request services like file operations, process control, memory allocation, and network access.\n\nCategories: Process control (fork, exec, wait, exit), File management (open, read, write, close), Device management (ioctl), Information maintenance (getpid, time), Communication (pipe, socket, shared memory).", keyPoints: ["System calls switch from user mode to kernel mode", "Trap instruction triggers the mode switch", "Each syscall has a unique number", "Wrapper functions (glibc) simplify syscall usage", "strace traces system calls made by a program"], handsOn: [{ task: "Write a program using system calls to copy a file.", hint: "Use open(), read(), write(), close() syscalls." }, { task: "Use strace to trace system calls of a simple program.", hint: "Run: strace ./your_program and analyze the output." }] },
    { title: "Inter-Process Communication", theory: "IPC allows processes to communicate and synchronize. Methods include pipes (unnamed/named), message queues, shared memory, sockets, and signals.\n\nPipes are unidirectional byte streams. Shared memory is the fastest IPC but requires synchronization. Message queues provide structured communication. Sockets enable network communication between processes on different machines.", keyPoints: ["Pipe: unidirectional, related processes", "Named pipe (FIFO): unrelated processes can communicate", "Shared memory: fastest IPC, needs synchronization", "Message queue: structured, asynchronous communication", "Socket: network-capable IPC"], handsOn: [{ task: "Implement communication between parent and child using a pipe.", hint: "Create pipe before fork; parent writes, child reads (or vice versa)." }, { task: "Create a shared memory segment for two processes to exchange data.", hint: "Use shmget, shmat, shmdt, shmctl system calls." }] }
  ],
  "dbms": [
    { title: "ER Model", theory: "The Entity-Relationship (ER) model is a conceptual data model for database design. Entities represent real-world objects, attributes describe properties, and relationships define associations between entities.\n\nKey concepts: strong vs weak entities, primary keys, composite/multivalued/derived attributes, cardinality (1:1, 1:N, M:N), participation (total/partial), and generalization/specialization hierarchies.", keyPoints: ["Entity: real-world object with attributes", "Relationship: association between entities", "Cardinality: 1:1, 1:N, M:N", "Weak entity depends on strong entity for identification", "ER diagrams are converted to relational schemas"], handsOn: [{ task: "Design an ER diagram for a university database (students, courses, professors).", hint: "Identify entities, their attributes, and relationships with cardinalities." }, { task: "Convert an ER diagram with M:N relationship to relational tables.", hint: "M:N relationship becomes a separate junction table." }] },
    { title: "Relational Model", theory: "The relational model organizes data into tables (relations) with rows (tuples) and columns (attributes). Each relation has a schema defining its structure. Relational algebra provides formal operations for querying data.\n\nKey operations: Select (σ), Project (π), Union, Set Difference, Cartesian Product, Rename, and derived operations like Join, Intersection, Division. Keys (super, candidate, primary, foreign) enforce integrity constraints.", keyPoints: ["Relation = table; Tuple = row; Attribute = column", "Primary key uniquely identifies each tuple", "Foreign key references primary key of another table", "Relational algebra is the theoretical foundation of SQL", "CODD's 12 rules define a truly relational DBMS"], handsOn: [{ task: "Write relational algebra expressions for common queries.", hint: "Use σ for selection, π for projection, ⋈ for join." }, { task: "Identify all candidate keys for a given relation.", hint: "Find minimal sets of attributes that determine all others." }] },
    { title: "SQL Queries", theory: "SQL (Structured Query Language) is the standard language for relational databases. It includes DDL (CREATE, ALTER, DROP), DML (SELECT, INSERT, UPDATE, DELETE), and DCL (GRANT, REVOKE).\n\nAdvanced SQL features include subqueries, joins (INNER, LEFT, RIGHT, FULL), GROUP BY with HAVING, window functions, CTEs (Common Table Expressions), and views. Understanding query execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.", keyPoints: ["JOIN types: INNER, LEFT, RIGHT, FULL OUTER, CROSS", "GROUP BY aggregates; HAVING filters groups", "Subqueries: correlated vs non-correlated", "Window functions: ROW_NUMBER, RANK, DENSE_RANK", "Index usage affects query performance significantly"], codeExample: { language: "sql", code: `-- Find top 3 students by average grade per department\nSELECT department, student_name, avg_grade,\n       RANK() OVER (PARTITION BY department ORDER BY avg_grade DESC) as dept_rank\nFROM (\n    SELECT s.name as student_name, s.department,\n           AVG(g.grade) as avg_grade\n    FROM students s\n    JOIN grades g ON s.id = g.student_id\n    GROUP BY s.id, s.name, s.department\n) ranked\nWHERE dept_rank <= 3;`, explanation: "Window functions with RANK() — a powerful SQL feature for analytical queries." }, handsOn: [{ task: "Write a query to find employees earning more than their manager.", hint: "Self-join employees table: e1.salary > e2.salary WHERE e2.id = e1.manager_id." }, { task: "Find the second highest salary without using LIMIT.", hint: "Use a subquery: SELECT MAX(salary) WHERE salary < (SELECT MAX(salary))." }] },
    { title: "Normalization", theory: "Normalization reduces data redundancy and prevents update anomalies by decomposing relations. Normal forms provide progressively stricter criteria.\n\n1NF: atomic values only. 2NF: 1NF + no partial dependencies. 3NF: 2NF + no transitive dependencies. BCNF: every determinant is a candidate key. Higher normal forms (4NF, 5NF) handle multi-valued and join dependencies. Denormalization is sometimes used for performance.", keyPoints: ["1NF: no repeating groups, atomic values", "2NF: no partial dependency on composite key", "3NF: no transitive dependency", "BCNF: stricter than 3NF, every determinant is a key", "Denormalization trades redundancy for read performance"], handsOn: [{ task: "Normalize a given table from UNF to 3NF step by step.", hint: "Identify functional dependencies, then decompose to eliminate anomalies." }, { task: "Identify whether a relation is in BCNF and decompose if not.", hint: "Check if every determinant is a superkey; if not, decompose." }] },
    { title: "Transactions & ACID", theory: "A transaction is a logical unit of work that must be executed atomically. ACID properties ensure reliability: Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrent transactions don't interfere), Durability (committed changes persist).\n\nIsolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable. Higher isolation = fewer anomalies but lower concurrency. Transaction states: Active, Partially Committed, Committed, Failed, Aborted.", keyPoints: ["Atomicity: transaction completes fully or not at all", "Consistency: database remains in valid state", "Isolation: concurrent transactions appear sequential", "Durability: committed data survives system failures", "WAL (Write-Ahead Logging) ensures atomicity and durability"], handsOn: [{ task: "Demonstrate a dirty read problem and fix it with proper isolation level.", hint: "Use READ UNCOMMITTED to show the problem; READ COMMITTED to fix." }, { task: "Write a bank transfer transaction with proper error handling.", hint: "BEGIN; UPDATE (debit); UPDATE (credit); COMMIT or ROLLBACK on error." }] },
    { title: "Concurrency Control", theory: "Concurrency control manages simultaneous transaction execution while maintaining consistency. Lock-based protocols use shared (read) and exclusive (write) locks. Two-Phase Locking (2PL) guarantees serializability.\n\nTimestamp-based protocols order transactions by timestamp. MVCC (Multi-Version Concurrency Control) maintains multiple versions, allowing reads without blocking writes. Deadlock detection uses wait-for graphs.", keyPoints: ["2PL: growing phase (acquire locks) → shrinking phase (release)", "Strict 2PL: hold all locks until commit", "MVCC: readers don't block writers and vice versa", "Deadlock: wait-for graph has a cycle", "Optimistic concurrency: validate at commit time"], handsOn: [{ task: "Trace a 2PL schedule and verify serializability.", hint: "Track lock acquisitions/releases; check if schedule is serializable." }, { task: "Detect deadlock in a given set of concurrent transactions.", hint: "Build a wait-for graph and look for cycles." }] },
    { title: "Indexing", theory: "Indexes speed up data retrieval by providing quick lookup structures. B-trees and B+ trees are the most common index structures in databases. B+ trees store all data in leaf nodes with linked pointers for range queries.\n\nTypes: Primary (clustered), Secondary (non-clustered), Dense, Sparse, Composite, Hash index. Indexes speed reads but slow writes. Query optimizers decide when to use indexes.", keyPoints: ["B+ tree: balanced, all data in leaves, O(log n) search", "Clustered index: rows physically ordered by index key", "Covering index includes all columns needed by query", "Too many indexes slow down INSERT/UPDATE/DELETE", "EXPLAIN shows index usage in query plans"], handsOn: [{ task: "Calculate the number of levels in a B+ tree given order and records.", hint: "Levels = ceil(log_p(n)) where p is order and n is number of records." }, { task: "Use EXPLAIN to analyze query plans with and without indexes.", hint: "Create index, run EXPLAIN ANALYZE on the query, compare costs." }] },
    { title: "Query Optimization", theory: "Query optimization transforms SQL queries into efficient execution plans. The optimizer considers multiple strategies and chooses the one with lowest estimated cost based on statistics.\n\nSteps: Parsing → Logical optimization (equivalence rules, predicate pushdown) → Physical optimization (join algorithms, index selection). Join algorithms: Nested Loop, Sort-Merge, Hash Join. Statistics (histograms, cardinality estimates) guide cost estimation.", keyPoints: ["Predicate pushdown: filter early to reduce data", "Join ordering significantly affects performance", "Hash join: best for equi-joins on large tables", "Cost-based optimization uses table statistics", "Materialized views precompute expensive queries"], handsOn: [{ task: "Rewrite a slow query using predicate pushdown and join reordering.", hint: "Move WHERE conditions closer to base tables; join smaller results first." }, { task: "Compare execution plans for different join strategies.", hint: "Use SET enable_hashjoin, enable_nestloop to force specific strategies." }] },
    { title: "NoSQL Basics", theory: "NoSQL databases provide alternatives to relational databases for specific use cases. Categories: Document stores (MongoDB), Key-Value stores (Redis), Column-family stores (Cassandra), Graph databases (Neo4j).\n\nNoSQL trades ACID for BASE (Basically Available, Soft state, Eventually consistent). CAP theorem: a distributed system can provide at most two of Consistency, Availability, Partition tolerance. Schema flexibility and horizontal scalability are key advantages.", keyPoints: ["Document DB: JSON-like documents, flexible schema", "Key-Value: simplest model, excellent for caching", "Column-family: optimized for write-heavy workloads", "Graph DB: relationships are first-class citizens", "CAP theorem constrains distributed system design"], handsOn: [{ task: "Design a schema for a social media app in MongoDB vs PostgreSQL.", hint: "MongoDB: embed posts in user document or reference. SQL: separate tables." }, { task: "Determine which NoSQL type suits different use cases.", hint: "Cache → Key-Value; Social graph → Graph DB; CMS → Document DB." }] },
    { title: "Database Security", theory: "Database security protects data from unauthorized access, modification, and destruction. It includes authentication, authorization, encryption, auditing, and SQL injection prevention.\n\nAccess control: DAC (Discretionary), MAC (Mandatory), RBAC (Role-Based). SQL injection is the most common database attack — prevented by parameterized queries. Encryption at rest and in transit protects data confidentiality.", keyPoints: ["GRANT/REVOKE control user privileges", "RBAC: assign permissions to roles, users to roles", "SQL injection: never concatenate user input into queries", "Parameterized queries/prepared statements prevent injection", "Encryption: AES for data at rest, TLS for data in transit"], handsOn: [{ task: "Demonstrate SQL injection and fix it with parameterized queries.", hint: "Show how ' OR 1=1 -- bypasses login; fix with prepared statements." }, { task: "Set up role-based access control for a multi-user application.", hint: "CREATE ROLE, GRANT specific privileges to roles, assign users to roles." }] }
  ]
};

// Generate placeholder content for subjects not yet detailed
const placeholderTopics = (subjectSlug: string, topics: string[]): TopicContent[] => {
  return topics.map((topic, i) => ({
    title: topic,
    theory: `${topic} is a fundamental concept in this domain. This section covers the core principles, real-world applications, and problem-solving techniques related to ${topic}.\n\nUnderstanding ${topic} is essential for building a strong foundation. We'll explore the theoretical aspects, examine practical implementations, and work through exercises to solidify your understanding.`,
    keyPoints: [
      `Core principles and definitions of ${topic}`,
      `Common applications and use cases`,
      `Key algorithms and techniques`,
      `Time and space complexity considerations`,
      `Interview-relevant aspects`
    ],
    handsOn: [
      { task: `Implement a basic demonstration of ${topic} concepts.`, hint: "Start with the simplest possible implementation, then optimize." },
      { task: `Solve a practice problem involving ${topic}.`, hint: "Break the problem into smaller subproblems." }
    ]
  }));
};

export function getTopicContent(subjectSlug: string, topics: string[]): TopicContent[] {
  if (topicContent[subjectSlug]) {
    return topicContent[subjectSlug];
  }
  return placeholderTopics(subjectSlug, topics);
}
