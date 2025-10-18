import ray
import numpy as np
import os
import socket

ray.init(address="auto")  # Connect to your local cluster

@ray.remote
def task(x):
    worker = os.environ.get("WORKER_NAME", "unknown")
    print(f"From {worker}: starting {x}")
    
    size = 3000
    A = np.random.rand(size, size)
    B = np.random.rand(size, size)
    C = A.dot(B)
    
    print(f"From {worker}: done {x}")
    return {
        "task": x,
        # "output": C,
        "worker_name": os.getenv("WORKER_NAME", "unknown"),
        "hostname": socket.gethostname()
    }

results = ray.get([task.remote(i) for i in list(range(8))])

print("=== Distributed Computation Results ===")
for r in results:
    print(r)

print("\nCluster resources:")
print(ray.cluster_resources())
