export type Language = "python" | "cpp" | "c" | "java" | "go" | "typescript";

export const languageLabels: Record<Language, string> = {
  python: "Python",
  cpp: "C++",
  c: "C",
  java: "Java",
  go: "Go",
  typescript: "TypeScript",
};

export interface TestCase {
  id: number;
  input: string;
  expected: string;
  hidden: boolean;
}

export interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  templates: Record<Language, string>;
  testCases: TestCase[];
}

export const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists."],
    templates: {
      python: `def two_sum(nums, target):
    # Your solution here
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

# Test
print(two_sum([2,7,11,15], 9))`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    for (int i = 0; i < nums.size(); i++) {
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    auto r = twoSum(nums, 9);
    cout << "[" << r[0] << ", " << r[1] << "]" << endl;
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* result = (int*)malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                *returnSize = 2;
                return result;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int size;
    int* r = twoSum(nums, 4, 9, &size);
    printf("[%d, %d]\\n", r[0], r[1]);
    free(r);
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));
    }
}`,
      go: `package main

import "fmt"

func twoSum(nums []int, target int) []int {
    for i := 0; i < len(nums); i++ {
        for j := i + 1; j < len(nums); j++ {
            if nums[i]+nums[j] == target {
                return []int{i, j}
            }
        }
    }
    return []int{}
}

func main() {
    fmt.Println(twoSum([]int{2, 7, 11, 15}, 9))
}`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9));`,
    },
    testCases: [
      { id: 1, input: "nums=[2,7,11,15], target=9", expected: "[0, 1]", hidden: false },
      { id: 2, input: "nums=[3,2,4], target=6", expected: "[1, 2]", hidden: false },
      { id: 3, input: "nums=[3,3], target=6", expected: "[0, 1]", hidden: false },
      { id: 4, input: "nums=[1,5,3,7], target=8", expected: "[1, 3]", hidden: true },
      { id: 5, input: "nums=[-1,-2,-3,-4,-5], target=-8", expected: "[2, 4]", hidden: true },
    ],
  },
  {
    id: 2,
    title: "Fibonacci Number",
    difficulty: "Easy",
    description: `The Fibonacci numbers, commonly denoted F(n), form a sequence such that each number is the sum of the two preceding ones, starting from 0 and 1.\n\nF(0) = 0, F(1) = 1\nF(n) = F(n - 1) + F(n - 2), for n > 1\n\nGiven n, calculate F(n).`,
    examples: [
      { input: "n = 2", output: "1", explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1." },
      { input: "n = 3", output: "2", explanation: "F(3) = F(2) + F(1) = 1 + 1 = 2." },
      { input: "n = 4", output: "3", explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3." },
    ],
    constraints: ["0 ≤ n ≤ 30"],
    templates: {
      python: `def fib(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# Test
print(fib(10))`,
      cpp: `#include <iostream>
using namespace std;

int fib(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int t = a + b;
        a = b;
        b = t;
    }
    return b;
}

int main() {
    cout << fib(10) << endl;
    return 0;
}`,
      c: `#include <stdio.h>

int fib(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int t = a + b;
        a = b;
        b = t;
    }
    return b;
}

int main() {
    printf("%d\\n", fib(10));
    return 0;
}`,
      java: `public class Main {
    public static int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int t = a + b;
            a = b;
            b = t;
        }
        return b;
    }

    public static void main(String[] args) {
        System.out.println(fib(10));
    }
}`,
      go: `package main

import "fmt"

func fib(n int) int {
    if n <= 1 {
        return n
    }
    a, b := 0, 1
    for i := 2; i <= n; i++ {
        a, b = b, a+b
    }
    return b
}

func main() {
    fmt.Println(fib(10))
}`,
      typescript: `function fib(n: number): number {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}

console.log(fib(10));`,
    },
    testCases: [
      { id: 1, input: "n=2", expected: "1", hidden: false },
      { id: 2, input: "n=3", expected: "2", hidden: false },
      { id: 3, input: "n=4", expected: "3", hidden: false },
      { id: 4, input: "n=10", expected: "55", hidden: false },
      { id: 5, input: "n=0", expected: "0", hidden: true },
      { id: 6, input: "n=20", expected: "6765", hidden: true },
      { id: 7, input: "n=30", expected: "832040", hidden: true },
    ],
  },
  {
    id: 3,
    title: "Maximum Subarray",
    difficulty: "Medium",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    templates: {
      python: `def max_subarray(nums):
    max_sum = nums[0]
    current = nums[0]
    for i in range(1, len(nums)):
        current = max(nums[i], current + nums[i])
        max_sum = max(max_sum, current)
    return max_sum

# Test
print(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], current = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        current = max(nums[i], current + nums[i]);
        maxSum = max(maxSum, current);
    }
    return maxSum;
}

int main() {
    vector<int> nums = {-2,1,-3,4,-1,2,1,-5,4};
    cout << maxSubArray(nums) << endl;
    return 0;
}`,
      c: `#include <stdio.h>

int maxSubArray(int* nums, int size) {
    int maxSum = nums[0], current = nums[0];
    for (int i = 1; i < size; i++) {
        current = nums[i] > current + nums[i] ? nums[i] : current + nums[i];
        maxSum = maxSum > current ? maxSum : current;
    }
    return maxSum;
}

int main() {
    int nums[] = {-2,1,-3,4,-1,2,1,-5,4};
    printf("%d\\n", maxSubArray(nums, 9));
    return 0;
}`,
      java: `public class Main {
    public static int maxSubArray(int[] nums) {
        int maxSum = nums[0], current = nums[0];
        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            maxSum = Math.max(maxSum, current);
        }
        return maxSum;
    }

    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4}));
    }
}`,
      go: `package main

import "fmt"

func maxSubArray(nums []int) int {
    maxSum, current := nums[0], nums[0]
    for i := 1; i < len(nums); i++ {
        if nums[i] > current+nums[i] {
            current = nums[i]
        } else {
            current = current + nums[i]
        }
        if current > maxSum {
            maxSum = current
        }
    }
    return maxSum
}

func main() {
    fmt.Println(maxSubArray([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4}))
}`,
      typescript: `function maxSubArray(nums: number[]): number {
    let maxSum = nums[0], current = nums[0];
    for (let i = 1; i < nums.length; i++) {
        current = Math.max(nums[i], current + nums[i]);
        maxSum = Math.max(maxSum, current);
    }
    return maxSum;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));`,
    },
    testCases: [
      { id: 1, input: "nums=[-2,1,-3,4,-1,2,1,-5,4]", expected: "6", hidden: false },
      { id: 2, input: "nums=[1]", expected: "1", hidden: false },
      { id: 3, input: "nums=[5,4,-1,7,8]", expected: "23", hidden: false },
      { id: 4, input: "nums=[-1]", expected: "-1", hidden: true },
      { id: 5, input: "nums=[-2,-1]", expected: "-1", hidden: true },
      { id: 6, input: "nums=[1,2,3,4,5]", expected: "15", hidden: true },
    ],
  },
  {
    id: 4,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    constraints: ["n == height.length", "1 ≤ n ≤ 2 × 10⁴", "0 ≤ height[i] ≤ 10⁵"],
    templates: {
      python: `def trap(height):
    if not height:
        return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water

# Test
print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int trap(vector<int>& height) {
    if (height.empty()) return 0;
    int left = 0, right = height.size() - 1;
    int leftMax = height[left], rightMax = height[right];
    int water = 0;
    while (left < right) {
        if (leftMax < rightMax) {
            left++;
            leftMax = max(leftMax, height[left]);
            water += leftMax - height[left];
        } else {
            right--;
            rightMax = max(rightMax, height[right]);
            water += rightMax - height[right];
        }
    }
    return water;
}

int main() {
    vector<int> h = {0,1,0,2,1,0,1,3,2,1,2,1};
    cout << trap(h) << endl;
    return 0;
}`,
      c: `#include <stdio.h>

int trap(int* height, int size) {
    if (size == 0) return 0;
    int left = 0, right = size - 1;
    int leftMax = height[left], rightMax = height[right];
    int water = 0;
    while (left < right) {
        if (leftMax < rightMax) {
            left++;
            if (height[left] > leftMax) leftMax = height[left];
            water += leftMax - height[left];
        } else {
            right--;
            if (height[right] > rightMax) rightMax = height[right];
            water += rightMax - height[right];
        }
    }
    return water;
}

int main() {
    int h[] = {0,1,0,2,1,0,1,3,2,1,2,1};
    printf("%d\\n", trap(h, 12));
    return 0;
}`,
      java: `public class Main {
    public static int trap(int[] height) {
        if (height.length == 0) return 0;
        int left = 0, right = height.length - 1;
        int leftMax = height[left], rightMax = height[right];
        int water = 0;
        while (left < right) {
            if (leftMax < rightMax) {
                left++;
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
            } else {
                right--;
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
            }
        }
        return water;
    }

    public static void main(String[] args) {
        System.out.println(trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1}));
    }
}`,
      go: `package main

import "fmt"

func trap(height []int) int {
    if len(height) == 0 {
        return 0
    }
    left, right := 0, len(height)-1
    leftMax, rightMax := height[left], height[right]
    water := 0
    for left < right {
        if leftMax < rightMax {
            left++
            if height[left] > leftMax {
                leftMax = height[left]
            }
            water += leftMax - height[left]
        } else {
            right--
            if height[right] > rightMax {
                rightMax = height[right]
            }
            water += rightMax - height[right]
        }
    }
    return water
}

func main() {
    fmt.Println(trap([]int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}))
}`,
      typescript: `function trap(height: number[]): number {
    if (height.length === 0) return 0;
    let left = 0, right = height.length - 1;
    let leftMax = height[left], rightMax = height[right];
    let water = 0;
    while (left < right) {
        if (leftMax < rightMax) {
            left++;
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
        } else {
            right--;
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
        }
    }
    return water;
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));`,
    },
    testCases: [
      { id: 1, input: "height=[0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6", hidden: false },
      { id: 2, input: "height=[4,2,0,3,2,5]", expected: "9", hidden: false },
      { id: 3, input: "height=[1,0,1]", expected: "1", hidden: false },
      { id: 4, input: "height=[2,0,2]", expected: "2", hidden: true },
      { id: 5, input: "height=[3,0,0,2,0,4]", expected: "10", hidden: true },
      { id: 6, input: "height=[0,0,0]", expected: "0", hidden: true },
    ],
  },
];
